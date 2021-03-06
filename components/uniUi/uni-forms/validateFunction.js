
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i')
};

const FORMAT_MAPPING = {
  "int": 'number',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number'
}

function formatMessage(args, resources) {
  var defaultMessage = ['label']
  defaultMessage.forEach((item) => {
    if (args[item] === undefined) {
      args[item] = ''
    }
  })

  let str = resources
  for (let key in args) {
    let reg = new RegExp('{' + key + '}')
    str = str.replace(reg, args[key])
  }
  return str
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  return false;
}

class RuleValidator {

  constructor(message) {
    this._message = message
  }

  validateRule(key, value, data) {
    var result = null

    let rules = key.rules

    let hasRequired = rules.findIndex((item) => { return item.required })
    if (value === undefined && hasRequired < 0) {
      return result
    }

    var message = this._message

    if (rules === undefined) {
      return message['default']
    }

    for (var i = 0; i < rules.length; i++) {
      let rule = rules[i]
      let vt = this._getValidateType(rule)

      if (key.label !== undefined) {
        Object.assign(rule, { label: key.label })
      }

      if (RuleValidatorHelper[vt]) {
        var v = RuleValidatorHelper[vt](rule, value, message)
        if (v != null) {
          result = v
          break
        }
      }

      if (rule.validateFunction) {
        var res = rule.validateFunction(rule, value, data)
        if (!res) {
          result = formatMessage(rule, rule.errorMessage || message[vt] || message['default'])
          break
        }
      }
    }

    return result
  }

  _getValidateType(rule) {
    // TODO
    var result = ''
    if (rule.required) {
      result = 'required'
    } else if (rule.enum || rule.maximum || rule.minimum || rule.maxLength || rule.minLength) {
      result = 'range'
    } else if (rule.format) {
      result = 'format'
    } else if (rule.pattern) {
      result = 'pattern'
    } else if (rule.validate) {
      result = 'validate'
    }
    return result
  }
}

const RuleValidatorHelper = {
  required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null
  },

  range(rule, value, message) {
    var type = (rule.maximum || rule.minimum) ? 1 : 0
    var min = type ? rule.minimum : rule.minLength;
    var max = type ? rule.maximum : rule.maxLength;

    var key = ['string', 'number'][type];
    var val = type ? value : value.length;
    var enumValue = rule.enum;

    if (enumValue) {
      if (enumValue.indexOf(value) < 0) {
        return formatMessage(rule, message[key].len);
      } else {
        return null;
      }
    } else if (min && !max && val < min) {
      return formatMessage(rule, rule.errorMessage || message[key].min)
    } else if (max && !min && val > max) {
      return formatMessage(rule, rule.errorMessage || message[key].max)
    } else if (min && max && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message[key].range)
    }

    return null
  },

  pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null
  },

  format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.types[format]);
      }
    }

    return null
  }
}

const types = {
  integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string(value) {
    return typeof value === 'string';
  },
  number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function (value) {
    return typeof value === 'boolean';
  },
  "float": function (value) {
    return types.number(value) && !types.integer(value);
  },
  array(value) {
    return Array.isArray(value);
  },
  object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date(value) {
    var v
    if (value instanceof Date) {
      v = value;
    } else {
      v = new Date(value);
    }
    return typeof v.getTime === 'function' && typeof v.getMonth === 'function' && typeof v.getYear === 'function' && !isNaN(v.getTime());
  },
  timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false
    }

    return this.date(value);
  },
  email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method(value) {
    return typeof value === 'function';
  }
}

class SchemaValidator extends RuleValidator {

  constructor(schema, options) {
    super(SchemaValidator.message);

    this._schema = schema
    this._options = options || null
  }

  updateSchema(schema) {
    this._schema = schema
  }

  validate(data) {
    var checkResult = this._checkField(data)
    if (checkResult) {
      return checkResult
    }

    var result = this.invokeValidate(data, false)
    return result.length ? result[0] : null
  }

  validateAll(data) {
    var checkResult = this._checkField(data)
    if (checkResult) {
      return checkResult
    }

    return this.invokeValidate(data, true)
  }

  validateUpdate(data) {
    var checkResult = this._checkField(data)
    if (checkResult) {
      return checkResult
    }

    var result = this.invokeValidateUpdate(data, false)
    return result.length ? result[0] : null
  }

  invokeValidate(data, all) {
    let result = []
    let schema = this._schema
    for (let key in schema) {
      let value = schema[key]

      let vir = this.validateRule(value, data[key], data)
      if (vir != null) {
        result.push({
          key: key,
          errorMessage: vir
        })

        if (!all) break
      }
    }

    return result
  }

  invokeValidateUpdate(data, all) {
    let result = []

    for (let key in data) {
      let vir = this.validateRule(this._schema[key], data[key], data)
      if (vir != null) {
        result.push({
          key: key,
          errorMessage: vir
        })
        if (!all) break
      }
    }

    return result
  }

  _checkField(data) {
    var keys = Object.keys(data)
    var keys2 = Object.keys(this._schema)
    if (new Set(keys.concat(keys2)).size === keys2.length) {
      return ''
    }
    return [{ key: 'invalid', errorMessage: SchemaValidator.message['defaultInvalid'] }]
  }
}

function Message() {
  return {
    default: '????????????',
    defaultInvalid: '????????????',
    required: '{label}??????',
    'enum': '{label}?????????',
    whitespace: '{label}????????????',
    date: {
      format: '{label}??????{value}????????????',
      parse: '{label}??????????????????,{value}??????',
      invalid: '{label}??????{value}??????'
    },
    types: {
      string: '{label}????????????',
      array: '{label}????????????',
      object: '{label}????????????',
      number: '{label}????????????',
      date: '{label}????????????',
      boolean: '{label}????????????',
      integer: '{label}????????????',
      float: '{label}????????????',
      regexp: '{label}??????',
      email: '{label}????????????',
      url: '{label}????????????'
    },
    string: {
      len: '{label}?????????{length}?????????',
      min: '{label}????????????{minLength}?????????',
      max: '{label}????????????{maxLength}?????????',
      range: '{label}????????????{minLength}???{maxLength}???????????????'
    },
    number: {
      len: '{label}????????????{length}',
      min: '{label}????????????{minimum}',
      max: '{label}????????????{maximum}',
      range: '{label}????????????{minimum}and{maximum}??????'
    },
    pattern: {
      mismatch: '{label}???????????????'
    }
  };
}


SchemaValidator.message = new Message();

export default SchemaValidator
