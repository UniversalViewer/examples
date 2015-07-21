!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jmespath=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var _indexOf = _dereq_("lodash.indexof");
var _isArray = _dereq_("lodash.isarray");
var _isObject = _dereq_("lodash.isobject");
var _keys = _dereq_("lodash.keys");
var _lastIndexOf = _dereq_("lodash.lastindexof");
var _toString = _dereq_("lodash._basetostring");

(function(exports) {
  "use strict";

  function strictDeepEqual(first, second) {
    // Check the scalar case first.
    if (first === second) {
      return true;
    }

    // Check if they are the same type.
    var firstType = _toString(first);// toString.call(first);
    if (firstType !== _toString(second)){// toString.call(second)) {
      return false;
    }
    // We know that first and second have the same type so we can just check the
    // first type from now on.
    if (_isArray(first) === true) {
      // Short circuit if they're not the same length;
      if (first.length !== second.length) {
        return false;
      }
      for (var i = 0; i < first.length; i++) {
        if (strictDeepEqual(first[i], second[i]) === false) {
          return false;
        }
      }
      return true;
    }
    if (_isObject(first) === true) {
      // An object is equal if it has the same key/value pairs.
      var keysSeen = {};
      for (var key in first) {
        if (hasOwnProperty.call(first, key)) {
          if (strictDeepEqual(first[key], second[key]) === false) {
            return false;
          }
          keysSeen[key] = true;
        }
      }
      // Now check that there aren't any keys in second that weren't
      // in first.
      for (var key2 in second) {
        if (hasOwnProperty.call(second, key2)) {
          if (keysSeen[key2] !== true) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isFalse(obj) {
    // From the spec:
    // A false value corresponds to the following values:
    // Empty list
    // Empty object
    // Empty string
    // False boolean
    // null value

    // First check the scalar values.
    if (obj === "" || obj === false || obj === null) {
        return true;
    } else if (_isArray(obj) && obj.length === 0) {
        // Check for an empty array.
        return true;
    } else if (_isObject(obj)) {
        // Check for an empty object.
        for (var key in obj) {
            // If there are any keys, then
            // the object is not empty so the object
            // is not false.
            if (obj.hasOwnProperty(key)) {
              return false;
            }
        }
        return true;
    } else {
        return false;
    }
  }

  function objValues(obj) {
    var keys = _keys(obj);
    var values = [];
    for (var i = 0; i < keys.length; i++) {
      values.push(obj[keys[i]]);
    }
    return values;
  }

  function merge(a, b) {
      var merged = {};
      for (var key in a) {
          merged[key] = a[key];
      }
      for (var key2 in b) {
          merged[key2] = b[key2];
      }
      return merged;
  }


  // The "[", "<", ">" tokens
  // are not in basicToken because
  // there are two token variants
  // ("[?", "<=", ">=").  This is specially handled
  // below.

  var basicTokens = {
    ".": "Dot",
    "*": "Star",
    ",": "Comma",
    ":": "Colon",
    "{": "Lbrace",
    "}": "Rbrace",
    "]": "Rbracket",
    "(": "Lparen",
    ")": "Rparen",
    "@": "Current",
    "&": "Expref"
  };

  var identifierStart = {
      a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true,
      i: true, j: true, k: true, l: true, m: true, n: true, o: true, p: true,
      q: true, r: true, s: true, t: true, u: true, v: true, w: true, x: true,
      y: true, z: true, A: true, B: true, C: true, D: true, E: true, F: true,
      G: true, H: true, I: true, J: true, K: true, L: true, M: true, N: true,
      O: true, P: true, Q: true, R: true, S: true, T: true, U: true, V: true,
      W: true, X: true, Y: true, Z: true, _: true
  };

  var operatorStartToken = {
      "<": true,
      ">": true,
      "=": true,
      "!": true
  };

  var numbers = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      "-": true
  };

  var identifierTrailing = merge(identifierStart, numbers);

  var skipChars = {
      " ": true,
      "\t": true,
      "\n": true
  };


  function Lexer() {
  }
  Lexer.prototype = {
      tokenize: function(stream) {
          var tokens = [];
          this.current = 0;
          var start;
          var identifier;
          var token;
          while (this.current < stream.length) {
              if (identifierStart[stream[this.current]] !== undefined) {
                  start = this.current;
                  identifier = this.consumeUnquotedIdentifier(stream);
                  tokens.push({type: "UnquotedIdentifier",
                               value: identifier,
                               start: start});
              } else if (basicTokens[stream[this.current]] !== undefined) {
                  tokens.push({type: basicTokens[stream[this.current]],
                              value: stream[this.current],
                              start: this.current});
                  this.current++;
              } else if (numbers[stream[this.current]] !== undefined) {
                  token = this.consumeNumber(stream);
                  tokens.push(token);
              } else if (stream[this.current] === "[") {
                  // No need to increment this.current.  This happens
                  // in consumeLBracket
                  token = this.consumeLBracket(stream);
                  tokens.push(token);
              } else if (stream[this.current] === "\"") {
                  start = this.current;
                  identifier = this.consumeQuotedIdentifier(stream);
                  tokens.push({type: "QuotedIdentifier",
                               value: identifier,
                               start: start});
              } else if (stream[this.current] === "'") {
                  start = this.current;
                  identifier = this.consumeRawStringLiteral(stream);
                  tokens.push({type: "Literal",
                               value: identifier,
                               start: start});
              } else if (stream[this.current] === "`") {
                  start = this.current;
                  var literal = this.consumeLiteral(stream);
                  tokens.push({type: "Literal",
                               value: literal,
                               start: start});
              } else if (operatorStartToken[stream[this.current]] !== undefined) {
                  tokens.push(this.consumeOperator(stream));
              } else if (skipChars[stream[this.current]] !== undefined) {
                  // Ignore whitespace.
                  this.current++;
              } else if (stream[this.current] === "|") {
                  start = this.current;
                  this.current++;
                  if (stream[this.current] === "|") {
                      this.current++;
                      tokens.push({type: "Or", value: "||", start: start});
                  } else {
                      tokens.push({type: "Pipe", value: "|", start: start});
                  }
              } else {
                  var error = new Error("Unknown character:" + stream[this.current]);
                  error.name = "LexerError";
                  throw error;
              }
          }
          return tokens;
      },

      consumeUnquotedIdentifier: function(stream) {
          var start = this.current;
          this.current++;
          while (identifierTrailing[stream[this.current]] !== undefined) {
              this.current++;
          }
          return stream.slice(start, this.current);
      },

      consumeQuotedIdentifier: function(stream) {
          var start = this.current;
          this.current++;
          var maxLength = stream.length;
          while (stream[this.current] !== "\"" && this.current < maxLength) {
              // You can escape a double quote and you can escape an escape.
              var current = this.current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "\"")) {
                  current += 2;
              } else {
                  current++;
              }
              this.current = current;
          }
          this.current++;
          return JSON.parse(stream.slice(start, this.current));
      },

      consumeRawStringLiteral: function(stream) {
          var start = this.current;
          this.current++;
          var maxLength = stream.length;
          while (stream[this.current] !== "'" && this.current < maxLength) {
              // You can escape a single quote and you can escape an escape.
              var current = this.current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "'")) {
                  current += 2;
              } else {
                  current++;
              }
              this.current = current;
          }
          this.current++;
          return stream.slice(start + 1, this.current - 1);
      },

      consumeNumber: function(stream) {
          var start = this.current;
          this.current++;
          var maxLength = stream.length;
          while (numbers[stream[this.current]] !== undefined && this.current < maxLength) {
              this.current++;
          }
          var value = parseInt(stream.slice(start, this.current));
          return {type: "Number", value: value, start: start};
      },

      consumeLBracket: function(stream) {
          var start = this.current;
          this.current++;
          if (stream[this.current] === "?") {
              this.current++;
              return {type: "Filter", value: "[?", start: start};
          } else if (stream[this.current] === "]") {
              this.current++;
              return {type: "Flatten", value: "[]", start: start};
          } else {
              return {type: "Lbracket", value: "[", start: start};
          }
      },

      consumeOperator: function(stream) {
          var start = this.current;
          var startingChar = stream[start];
          this.current++;
          if (startingChar === "!") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "NE", value: "!=", start: start};
              }
          } else if (startingChar === "<") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "LTE", value: "<=", start: start};
              } else {
                  return {type: "LT", value: "<", start: start};
              }
          } else if (startingChar === ">") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "GTE", value: ">=", start: start};
              } else {
                  return {type: "GT", value: ">", start: start};
              }
          } else if (startingChar === "=") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "EQ", value: "==", start: start};
              }
          }
      },

      consumeLiteral: function(stream) {
          this.current++;
          var start = this.current;
          var maxLength = stream.length;
          var literal;
          while(stream[this.current] !== "`" && this.current < maxLength) {
              // You can escape a literal char or you can escape the escape.
              var current = this.current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "`")) {
                  current += 2;
              } else {
                  current++;
              }
              this.current = current;
          }
          var literalString = stream.slice(start, this.current).trimLeft();
          literalString = literalString.replace("\\`", "`");
          if (this.looksLikeJSON(literalString)) {
              literal = JSON.parse(literalString);
          } else {
              // Try to JSON parse it as "<literal>"
              literal = JSON.parse("\"" + literalString + "\"");
          }
          // +1 gets us to the ending "`", +1 to move on to the next char.
          this.current++;
          return literal;
      },

      looksLikeJSON: function(literalString) {
          var startingChars = "[{\"";
          var jsonLiterals = ["true", "false", "null"];
          var numberLooking = "-0123456789";

          if (literalString === "") {
              return false;
          } else if (_indexOf(startingChars, literalString[0]) >= 0) {
              return true;
          } else if (_indexOf(jsonLiterals, literalString) >= 0) {
              return true;
          } else if (_indexOf(numberLooking, literalString[0]) >= 0) {
              try {
                  JSON.parse(literalString);
                  return true;
              } catch (ex) {
                  return false;
              }
          } else {
              return false;
          }
      }
  };


  function Parser() {
      this.bindingPower = {
          "EOF": 0,
          "UnquotedIdentifier": 0,
          "QuotedIdentifier": 0,
          "Rbracket": 0,
          "Rparen": 0,
          "Comma": 0,
          "Rbrace": 0,
          "Number": 0,
          "Current": 0,
          "Expref": 0,
          "Pipe": 1,
          "EQ": 2,
          "GT": 2,
          "LT": 2,
          "GTE": 2,
          "LTE": 2,
          "NE": 2,
          "Or": 5,
          "Flatten": 6,
          "Star": 20,
          "Filter": 20,
          "Dot": 40,
          "Lbrace": 50,
          "Lbracket": 55,
          "Lparen": 60
      };
  }

  Parser.prototype = {
      parse: function(expression) {
          this.loadTokens(expression);
          this.index = 0;
          var ast = this.expression(0);
          if (this.lookahead(0) !== "EOF") {
              var t = this.lookaheadToken(0);
              var error = new Error(
                  "Unexpected token type: " + t.type + ", value: " + t.value);
              error.name = "ParserError";
              throw error;
          }
          return ast;
      },

      loadTokens: function(expression) {
          var lexer = new Lexer();
          var tokens = lexer.tokenize(expression);
          tokens.push({type: "EOF", value: "", start: expression.length});
          this.tokens = tokens;
      },

      expression: function(rbp) {
          var leftToken = this.lookaheadToken(0);
          this.advance();
          var name = "nud" + leftToken.type;
          var nudMethod = this[name] || this.errorToken;
          var left = nudMethod.call(this, leftToken);
          var currentToken = this.lookahead(0);
          while (rbp < this.bindingPower[currentToken]) {
              var ledMethod = this["led" + currentToken];
              if (ledMethod === undefined) {
                  this.errorToken(this.lookaheadToken(0));
              }
              this.advance();
              left = ledMethod.call(this, left);
              currentToken = this.lookahead(0);
          }
          return left;
      },

      lookahead: function(number) {
          return this.tokens[this.index + number].type;
      },

      lookaheadToken: function(number) {
          return this.tokens[this.index + number];
      },

      advance: function() {
          this.index++;
      },

      match: function(tokenType) {
          if (this.lookahead(0) === tokenType) {
              this.advance();
          } else {
              var t = this.lookaheadToken(0);
              var error = new Error("Expected " + tokenType + ", got: " + t.type);
              error.name = "ParserError";
              throw error;
          }
      },

      errorToken: function(token) {
          var error = new Error("Invalid token (" +
                                token.type + "): \"" +
                                token.value + "\"");
          error.name = "ParserError";
          throw error;
      },

      nudLiteral: function(token) {
          return {type: "Literal", value: token.value};
      },

      nudUnquotedIdentifier: function(token) {
          return {type: "Field", name: token.value};
      },

      nudExpref: function() {
        var expression = this.expression(this.bindingPower.Expref);
        return {type: "ExpressionReference", children: [expression]};
      },

      nudQuotedIdentifier: function(token) {
          var node = {type: "Field", name: token.value};
          if (this.lookahead(0) === "Lparen") {
              throw new Error("Quoted identifier not allowed for function names.");
          } else {
              return node;
          }
      },

      ledOr: function(left) {
        var right = this.expression(this.bindingPower.Or);
        return {type: "OrExpression", children: [left, right]};
      },

      ledPipe: function(left) {
          var right = this.expression(this.bindingPower.Pipe);
          return {type: "Pipe", children: [left, right]};
      },

      nudStar: function() {
          var left = {type: "Identity"};
          var right = null;
          if (this.lookahead(0) === "Rbracket") {
              // This can happen in a multiselect,
              // [a, b, *]
              right = {type: "Identity"};
          } else {
              right = this.parseProjectionRHS(this.bindingPower.Star);
          }
          return {type: "ValueProjection", children: [left, right]};
      },

      nudCurrent: function() {
          return {type: "Current"};
      },

      nudLbracket: function() {
          var right;
          if (this.lookahead(0) === "Number" || this.lookahead(0) === "Colon") {
              right = this.parseIndexExpression();
              return this.projectIfSlice({type: "Identity"}, right);
          } else if (this.lookahead(0) === "Star" &&
                     this.lookahead(1) === "Rbracket") {
              this.advance();
              this.advance();
              right = this.parseProjectionRHS(this.bindingPower.Star);
              return {type: "Projection",
                      children: [{type: "Identity"}, right]};
          } else {
              return this.parseMultiselectList();
          }
      },

      parseIndexExpression: function() {
          if (this.lookahead(0) === "Colon" || this.lookahead(1) === "Colon") {
              return this.parseSliceExpression();
          } else {
              var node = {
                  type: "Index",
                  value: this.lookaheadToken(0).value};
              this.advance();
              this.match("Rbracket");
              return node;
          }
      },

      projectIfSlice: function(left, right) {
          var indexExpr = {type: "IndexExpression", children: [left, right]};
          if (right.type === "Slice") {
              return {
                  type: "Projection",
                  children: [indexExpr, this.parseProjectionRHS(this.bindingPower.Star)]
              };
          } else {
              return indexExpr;
          }
      },

      parseSliceExpression: function() {
          // [start:end:step] where each part is optional, as well as the last
          // colon.
          var parts = [null, null, null];
          var index = 0;
          var currentToken = this.lookahead(0);
          while (currentToken !== "Rbracket" && index < 3) {
              if (currentToken === "Colon") {
                  index++;
                  this.advance();
              } else if (currentToken === "Number") {
                  parts[index] = this.lookaheadToken(0).value;
                  this.advance();
              } else {
                  var t = this.lookahead(0);
                  var error = new Error("Syntax error, unexpected token: " +
                                        t.value + "(" + t.type + ")");
                  error.name = "Parsererror";
                  throw error;
              }
              currentToken = this.lookahead(0);
          }
          this.match("Rbracket");
          return {
              type: "Slice",
              children: parts
          };
      },

      nudLbrace: function() {
          return this.parseMultiselectHash();
      },

      ledDot: function(left) {
          var rbp = this.bindingPower.Dot;
          var right;
          if (this.lookahead(0) !== "Star") {
              right = this.parseDotRHS(rbp);
              return {type: "Subexpression", children: [left, right]};
          } else {
              // Creating a projection.
              this.advance();
              right = this.parseProjectionRHS(rbp);
              return {type: "ValueProjection", children: [left, right]};
          }
      },

      nudFilter: function() {
        return this.ledFilter({type: "Identity"});
      },

      ledFilter: function(left) {
        var condition = this.expression(0);
        var right;
        this.match("Rbracket");
        if (this.lookahead(0) === "Flatten") {
          right = {type: "Identity"};
        } else {
          right = this.parseProjectionRHS(this.bindingPower.Filter);
        }
        return {type: "FilterProjection", children: [left, right, condition]};
      },

      ledEQ: function(left) {
        return this.parseComparator(left, "EQ");
      },

      ledNE: function(left) {
        return this.parseComparator(left, "NE");
      },

      ledGT: function(left) {
        return this.parseComparator(left, "GT");
      },

      ledGTE: function(left) {
        return this.parseComparator(left, "GTE");
      },

      ledLT: function(left) {
        return this.parseComparator(left, "LT");
      },

      ledLTE: function(left) {
        return this.parseComparator(left, "LTE");
      },

      parseComparator: function(left, comparator) {
        var right = this.expression(this.bindingPower[comparator]);
        return {type: "Comparator", name: comparator, children: [left, right]};
      },

      ledLbracket: function(left) {
          var token = this.lookaheadToken(0);
          var right;
          if (token.type === "Number" || token.type === "Colon") {
              right = this.parseIndexExpression();
              return this.projectIfSlice(left, right);
          } else {
              this.match("Star");
              this.match("Rbracket");
              right = this.parseProjectionRHS(this.bindingPower.Star);
              return {type: "Projection", children: [left, right]};
          }
      },

      nudFlatten: function() {
          var left = {type: "Flatten", children: [{type: "Identity"}]};
          var right = this.parseProjectionRHS(this.bindingPower.Flatten);
          return {type: "Projection", children: [left, right]};
      },

      ledFlatten: function(left) {
          var leftNode = {type: "Flatten", children: [left]};
          var rightNode = this.parseProjectionRHS(this.bindingPower.Flatten);
          return {type: "Projection", children: [leftNode, rightNode]};
      },

      ledLparen: function(left) {
        var name = left.name;
        var args = [];
        var expression, node;
        while (this.lookahead(0) !== "Rparen") {
          if (this.lookahead(0) === "Current") {
            expression = {type: "Current"};
            this.advance();
          } else {
            expression = this.expression(0);
          }
          if (this.lookahead(0) === "Comma") {
            this.match("Comma");
          }
          args.push(expression);
        }
        this.match("Rparen");
        node = {type: "Function", name: name, children: args};
        return node;
      },

      parseDotRHS: function(rbp) {
          var lookahead = this.lookahead(0);
          var exprTokens = ["UnquotedIdentifier", "QuotedIdentifier", "Star"];
          if (_indexOf(exprTokens, lookahead) >= 0) {
              return this.expression(rbp);
          } else if (lookahead === "Lbracket") {
              this.match("Lbracket");
              return this.parseMultiselectList();
          } else if (lookahead === "Lbrace") {
              this.match("Lbrace");
              return this.parseMultiselectHash();
          }
      },

      parseProjectionRHS: function(rbp) {
          var right;
          if (this.bindingPower[this.lookahead(0)] < 10) {
              right = {type: "Identity"};
          } else if (this.lookahead(0) === "Lbracket") {
              right = this.expression(rbp);
          } else if (this.lookahead(0) === "Filter") {
              right = this.expression(rbp);
          } else if (this.lookahead(0) === "Dot") {
              this.match("Dot");
              right = this.parseDotRHS(rbp);
          } else {
              var t = this.lookaheadToken(0);
              var error = new Error("Sytanx error, unexpected token: " +
                                    t.value + "(" + t.type + ")");
              error.name = "ParserError";
              throw error;
          }
          return right;
      },

      parseMultiselectList: function() {
          var expressions = [];
          while (this.lookahead(0) !== "Rbracket") {
              var expression = this.expression(0);
              expressions.push(expression);
              if (this.lookahead(0) === "Comma") {
                  this.match("Comma");
                  if (this.lookahead(0) === "Rbracket") {
                    throw new Error("Unexpected token Rbracket");
                  }
              }
          }
          this.match("Rbracket");
          return {type: "MultiSelectList", children: expressions};
      },

      parseMultiselectHash: function() {
        var pairs = [];
        var identifierTypes = ["UnquotedIdentifier", "QuotedIdentifier"];
        var keyToken, keyName, value, node;
        for (;;) {
          keyToken = this.lookaheadToken(0);
          if (_indexOf(identifierTypes, keyToken.type) < 0) {
            throw new Error("Expecting an identifier token, got: " +
                            keyToken.type);
          }
          keyName = keyToken.value;
          this.advance();
          this.match("Colon");
          value = this.expression(0);
          node = {type: "KeyValuePair", name: keyName, value: value};
          pairs.push(node);
          if (this.lookahead(0) === "Comma") {
            this.match("Comma");
          } else if (this.lookahead(0) === "Rbrace") {
            this.match("Rbrace");
            break;
          }
        }
        return {type: "MultiSelectHash", children: pairs};
      }
  };


  function TreeInterpreter(runtime) {
    this.runtime = runtime;
  }

  TreeInterpreter.prototype = {
      search: function(node, value) {
          return this.visit(node, value);
      },

      visit: function(node, value) {
          var visitMethod = this["visit" + node.type];
          if (visitMethod === undefined) {
              throw new Error("Unknown node type: " + node.type);
          }
          return visitMethod.call(this, node, value);
      },

      visitField: function(node, value) {
          if (value === null ) {
              return null;
          } else if (_isObject(value)) {
              var field = value[node.name];
              if (field === undefined) {
                  return null;
              } else {
                  return field;
              }
          } else {
            return null;
          }
      },

      visitSubexpression: function(node, value) {
          var result = this.visit(node.children[0], value);
          for (var i = 1; i < node.children.length; i++) {
              result = this.visit(node.children[1], result);
              if (result === null) {
                  return null;
              }
          }
          return result;
      },

      visitIndexExpression: function(node, value) {
        var left = this.visit(node.children[0], value);
        var right = this.visit(node.children[1], left);
        return right;
      },

      visitIndex: function(node, value) {
        if (!_isArray(value)) {
          return null;
        }
        var index = node.value;
        if (index < 0) {
          index = value.length + index;
        }
        var result = value[index];
        if (result === undefined) {
          result = null;
        }
        return result;
      },

      visitSlice: function(node, value) {
        if (!_isArray(value)) {
          return null;
        }
        var sliceParams = node.children.slice(0);
        var computed = this.computeSliceParams(value.length, sliceParams);
        var start = computed[0];
        var stop = computed[1];
        var step = computed[2];
        var result = [];
        var i;
        if (step > 0) {
            for (i = start; i < stop; i += step) {
                result.push(value[i]);
            }
        } else {
            for (i = start; i > stop; i += step) {
                result.push(value[i]);
            }
        }
        return result;
      },

      computeSliceParams: function(arrayLength, sliceParams) {
        var start = sliceParams[0];
        var stop = sliceParams[1];
        var step = sliceParams[2];
        var computed = [null, null, null];
        if (step === null) {
          step = 1;
        } else if (step === 0) {
          var error = new Error("Invalid slice, step cannot be 0");
          error.name = "RuntimeError";
          throw error;
        }
        var stepValueNegative = step < 0 ? true : false;

        if (start === null) {
            start = stepValueNegative ? arrayLength - 1 : 0;
        } else {
            start = this.capSliceRange(arrayLength, start, step);
        }

        if (stop === null) {
            stop = stepValueNegative ? -1 : arrayLength;
        } else {
            stop = this.capSliceRange(arrayLength, stop, step);
        }
        computed[0] = start;
        computed[1] = stop;
        computed[2] = step;
        return computed;
      },

      capSliceRange: function(arrayLength, actualValue, step) {
          if (actualValue < 0) {
              actualValue += arrayLength;
              if (actualValue < 0) {
                  actualValue = step < 0 ? -1 : 0;
              }
          } else if (actualValue >= arrayLength) {
              actualValue = step < 0 ? arrayLength - 1 : arrayLength;
          }
          return actualValue;
      },

      visitProjection: function(node, value) {
        // Evaluate left child.
        var base = this.visit(node.children[0], value);
        if (!_isArray(base)) {
          return null;
        }
        var collected = [];
        for (var i = 0; i < base.length; i++) {
          var current = this.visit(node.children[1], base[i]);
          if (current !== null) {
            collected.push(current);
          }
        }
        return collected;
      },

      visitValueProjection: function(node, value) {
        // Evaluate left child.
        var base = this.visit(node.children[0], value);
        if (!_isObject(base)) {
          return null;
        }
        var collected = [];
        var values = objValues(base);
        for (var i = 0; i < values.length; i++) {
          var current = this.visit(node.children[1], values[i]);
          if (current !== null) {
            collected.push(current);
          }
        }
        return collected;
      },

      visitFilterProjection: function(node, value) {
        var base = this.visit(node.children[0], value);
        if (!_isArray(base)) {
          return null;
        }
        var filtered = [];
        var finalResults = [];
        var matched, current;
        for (var i = 0; i < base.length; i++) {
          matched = this.visit(node.children[2], base[i]);
          if (matched === true) {
            filtered.push(base[i]);
          }
        }
        for (var j = 0; j < filtered.length; j++) {
          current = this.visit(node.children[1], filtered[j]);
          if (current !== null) {
            finalResults.push(current);
          }
        }
        return finalResults;
      },

      visitComparator: function(node, value) {
        var first = this.visit(node.children[0], value);
        var second = this.visit(node.children[1], value);
        var result;
        switch(node.name) {
          case "EQ":
            result = strictDeepEqual(first, second);
            break;
          case "NE":
            result = !strictDeepEqual(first, second);
            break;
          case "GT":
            result = first > second;
            break;
          case "GTE":
            result = first >= second;
            break;
          case "LT":
            result = first < second;
            break;
          case "LTE":
            result = first <= second;
            break;
          default:
            throw new Error("Unknown comparator: " + node.name);
        }
        return result;
      },

      visitFlatten: function(node, value) {
        var original = this.visit(node.children[0], value);
        if (!_isArray(original)) {
          return null;
        }
        var merged = [];
        for (var i = 0; i < original.length; i++) {
          var current = original[i];
          if (_isArray(current)) {
            merged.push.apply(merged, current);
          } else {
            merged.push(current);
          }
        }
        return merged;
      },

      visitIdentity: function(node, value) {
        return value;
      },

      visitMultiSelectList: function(node, value) {
        if (value === null) {
          return null;
        }
        var collected = [];
        for (var i = 0; i < node.children.length; i++) {
            collected.push(this.visit(node.children[i], value));
        }
        return collected;
      },

      visitMultiSelectHash: function(node, value) {
        if (value === null) {
          return null;
        }
        var collected = {};
        var child;
        for (var i = 0; i < node.children.length; i++) {
          child = node.children[i];
          collected[child.name] = this.visit(child.value, value);
        }
        return collected;
      },

      visitOrExpression: function(node, value) {
        var matched = this.visit(node.children[0], value);
        if (isFalse(matched)) {
            matched = this.visit(node.children[1], value);
        }
        return matched;
      },

      visitLiteral: function(node) {
          return node.value;
      },

      visitPipe: function(node, value) {
        var left = this.visit(node.children[0], value);
        return this.visit(node.children[1], left);
      },

      visitCurrent: function(node, value) {
          return value;
      },

      visitFunction: function(node, value) {
        var resolvedArgs = [];
        for (var i = 0; i < node.children.length; i++) {
            resolvedArgs.push(this.visit(node.children[i], value));
        }
        return this.runtime.callFunction(node.name, resolvedArgs);
      },

      visitExpressionReference: function(node) {
        var refNode = node.children[0];
        // Tag the node with a specific attribute so the type
        // checker verify the type.
        refNode.jmespathType = "Expref";
        return refNode;
      }
  };

  function Runtime(interpreter) {
    this.interpreter = interpreter;
    this.functionTable = {
        // name: [function, <signature>]
        // The <signature> can be:
        //
        // {
        //   args: [[type1, type2], [type1, type2]],
        //   variadic: true|false
        // }
        //
        // Each arg in the arg list is a list of valid types
        // (if the function is overloaded and supports multiple
        // types.  If the type is "any" then no type checking
        // occurs on the argument.  Variadic is optional
        // and if not provided is assumed to be false.
        abs: {func: this.functionAbs, signature: [{types: ["number"]}]},
        avg: {func: this.functionAvg, signature: [{types: ["array-number"]}]},
        ceil: {func: this.functionCeil, signature: [{types: ["number"]}]},
        contains: {
            func: this.functionContains,
            signature: [{types: ["string", "array"]}, {types: ["any"]}]},
        "ends_with": {
            func: this.functionEndsWith,
            signature: [{types: ["string"]}, {types: ["string"]}]},
        floor: {func: this.functionFloor, signature: [{types: ["number"]}]},
        length: {
            func: this.functionLength,
            signature: [{types: ["string", "array", "object"]}]},
        max: {
            func: this.functionMax,
            signature: [{types: ["array-number", "array-string"]}]},
        "merge": {
            func: this.functionMerge,
            signature: [{types: ["object"], variadic: true}]
        },
        "max_by": {
          func: this.functionMaxBy,
          signature: [{types: ["array"]}, {types: ["expref"]}]
        },
        sum: {func: this.functionSum, signature: [{types: ["array-number"]}]},
        "starts_with": {
            func: this.functionStartsWith,
            signature: [{types: ["string"]}, {types: ["string"]}]},
        min: {
            func: this.functionMin,
            signature: [{types: ["array-number", "array-string"]}]},
        "min_by": {
          func: this.functionMinBy,
          signature: [{types: ["array"]}, {types: ["expref"]}]
        },
        type: {func: this.functionType, signature: [{types: ["any"]}]},
        keys: {func: this.functionKeys, signature: [{types: ["object"]}]},
        values: {func: this.functionValues, signature: [{types: ["object"]}]},
        sort: {func: this.functionSort, signature: [{types: ["array-string", "array-number"]}]},
        "sort_by": {
          func: this.functionSortBy,
          signature: [{types: ["array"]}, {types: ["expref"]}]
        },
        join: {
            func: this.functionJoin,
            signature: [
                {types: ["string"]},
                {types: ["array-string"]}
            ]
        },
        reverse: {
            func: this.functionReverse,
            signature: [{types: ["string", "array"]}]},
        "to_array": {func: this.functionToArray, signature: [{types: ["any"]}]},
        "to_string": {func: this.functionToString, signature: [{types: ["any"]}]},
        "to_number": {func: this.functionToNumber, signature: [{types: ["any"]}]},
        "not_null": {
            func: this.functionNotNull,
            signature: [{types: ["any"], variadic: true}]
        }
    };
  }

  Runtime.prototype = {
    callFunction: function(name, resolvedArgs) {
      var functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
          throw new Error("Unknown function: " + name + "()");
      }
      this.validateArgs(name, resolvedArgs, functionEntry.signature);
      return functionEntry.func.call(this, resolvedArgs);
    },

    validateArgs: function(name, args, signature) {
        // Validating the args requires validating
        // the correct arity and the correct type of each arg.
        // If the last argument is declared as variadic, then we need
        // a minimum number of args to be required.  Otherwise it has to
        // be an exact amount.
        var pluralized;
        if (signature[signature.length - 1].variadic) {
            if (args.length < signature.length) {
                pluralized = signature.length === 1 ? " argument" : " arguments";
                throw new Error("ArgumentError: " + name + "() " +
                                "takes at least" + signature.length + pluralized +
                                " but received " + args.length);
            }
        } else if (args.length !== signature.length) {
            pluralized = signature.length === 1 ? " argument" : " arguments";
            throw new Error("ArgumentError: " + name + "() " +
                            "takes " + signature.length + pluralized +
                            " but received " + args.length);
        }
        var currentSpec;
        var actualType;
        var typeMatched;
        for (var i = 0; i < signature.length; i++) {
            typeMatched = false;
            currentSpec = signature[i].types;
            actualType = this.getTypeName(args[i]);
            for (var j = 0; j < currentSpec.length; j++) {
                if (this.typeMatches(actualType, currentSpec[j], args[i])) {
                    typeMatched = true;
                    break;
                }
            }
            if (!typeMatched) {
                throw new Error("TypeError: " + name + "() " +
                                "expected argument " + (i + 1) +
                                " to be type " + currentSpec +
                                " but received type " + actualType +
                                " instead.");
            }
        }
    },

    typeMatches: function(actual, expected, argValue) {
        if (expected === "any") {
            return true;
        }
        if (_indexOf(expected, "array") === 0) {
            // The expected type can either just be array,
            // or it can require a specific subtype (array of numbers).
            //
            // The simplest case is if "array" with no subtype is specified.
            if (expected === "array") {
                return _indexOf(actual, "array") === 0;
            } else if (_indexOf(actual, "array") === 0) {
                // Otherwise we need to check subtypes.
                // I think this has potential to be improved.
                var subtype = expected.split("-")[1];
                for (var i = 0; i < argValue.length; i++) {
                    if (!this.typeMatches(
                            this.getTypeName(argValue[i]), subtype,
                                             argValue[i])) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            return actual === expected;
        }
    },
    getTypeName: function(obj) {
        //switch (toString.call(obj)) {
        switch (_toString(obj)) {
            case "[object String]":
              return "string";
            case "[object Number]":
              return "number";
            case "[object Array]":
              return "array";
            case "[object Boolean]":
              return "boolean";
            case "[object Null]":
              return "null";
            case "[object Object]":
              // Check if it's an expref.  If it has, it's been
              // tagged with a jmespathType attr of 'Expref';
              if (obj.jmespathType === "Expref") {
                return "expref";
              } else {
                return "object";
              }
        }
    },

    functionStartsWith: function(resolvedArgs) {
        return _lastIndexOf(resolvedArgs[0], resolvedArgs[1]) === 0;
    },

    functionEndsWith: function(resolvedArgs) {
        var searchStr = resolvedArgs[0];
        var suffix = resolvedArgs[1];
        return _indexOf(suffix, searchStr.length - suffix.length) !== -1;
    },

    functionReverse: function(resolvedArgs) {
        var typeName = this.getTypeName(resolvedArgs[0]);
        if (typeName === "string") {
          var originalStr = resolvedArgs[0];
          var reversedStr = "";
          for (var i = originalStr.length - 1; i >= 0; i--) {
              reversedStr += originalStr[i];
          }
          return reversedStr;
        } else {
          var reversedArray = resolvedArgs[0].slice(0);
          reversedArray.reverse();
          return reversedArray;
        }
    },

    functionAbs: function(resolvedArgs) {
      return Math.abs(resolvedArgs[0]);
    },

    functionCeil: function(resolvedArgs) {
        return Math.ceil(resolvedArgs[0]);
    },

    functionAvg: function(resolvedArgs) {
        var sum = 0;
        var inputArray = resolvedArgs[0];
        for (var i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum / inputArray.length;
    },

    functionContains: function(resolvedArgs) {
        return _indexOf(resolvedArgs[0], resolvedArgs[1]) >= 0;
    },

    functionFloor: function(resolvedArgs) {
        return Math.floor(resolvedArgs[0]);
    },

    functionLength: function(resolvedArgs) {
       if (!_isObject(resolvedArgs[0])) {
         return resolvedArgs[0].length;
       } else {
         // As far as I can tell, there's no way to get the length
         // of an object without O(n) iteration through the object.
         return _keys(resolvedArgs[0]).length;
       }
    },

    functionMerge: function(resolvedArgs) {
      var merged = {};
      for (var i = 0; i < resolvedArgs.length; i++) {
        var current = resolvedArgs[i];
        for (var key in current) {
          merged[key] = current[key];
        }
      }
      return merged;
    },

    functionMax: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this.getTypeName(resolvedArgs[0][0]);
        if (typeName === "number") {
          return Math.max.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var maxElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (maxElement.localeCompare(elements[i]) < 0) {
                  maxElement = elements[i];
              }
          }
          return maxElement;
        }
      } else {
          return null;
      }
    },

    functionMin: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this.getTypeName(resolvedArgs[0][0]);
        if (typeName === "number") {
          return Math.min.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var minElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (elements[i].localeCompare(minElement) < 0) {
                  minElement = elements[i];
              }
          }
          return minElement;
        }
      } else {
        return null;
      }
    },

    functionSum: function(resolvedArgs) {
      var sum = 0;
      var listToSum = resolvedArgs[0];
      for (var i = 0; i < listToSum.length; i++) {
        sum += listToSum[i];
      }
      return sum;
    },

    functionType: function(resolvedArgs) {
        return this.getTypeName(resolvedArgs[0]);
    },

    functionKeys: function(resolvedArgs) {
        return _keys(resolvedArgs[0]);
    },

    functionValues: function(resolvedArgs) {
        var obj = resolvedArgs[0];
        var keys = _keys(obj);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    },

    functionJoin: function(resolvedArgs) {
        var joinChar = resolvedArgs[0];
        var listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
    },

    functionToArray: function(resolvedArgs) {
        if (this.getTypeName(resolvedArgs[0]) === "array") {
            return resolvedArgs[0];
        } else {
            return [resolvedArgs[0]];
        }
    },

    functionToString: function(resolvedArgs) {
        if (this.getTypeName(resolvedArgs[0]) === "string") {
            return resolvedArgs[0];
        } else {
            return JSON.stringify(resolvedArgs[0]);
        }
    },

    functionToNumber: function(resolvedArgs) {
        var typeName = this.getTypeName(resolvedArgs[0]);
        var convertedValue;
        if (typeName === "number") {
            return resolvedArgs[0];
        } else if (typeName === "string") {
            convertedValue = +resolvedArgs[0];
            if (!isNaN(convertedValue)) {
                return convertedValue;
            }
        }
        return null;
    },

    functionNotNull: function(resolvedArgs) {
        for (var i = 0; i < resolvedArgs.length; i++) {
            if (this.getTypeName(resolvedArgs[i]) !== "null") {
                return resolvedArgs[i];
            }
        }
        return null;
    },

    functionSort: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        sortedArray.sort();
        return sortedArray;
    },

    functionSortBy: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
            return sortedArray;
        }
        var interpreter = this.interpreter;
        var exprefNode = resolvedArgs[1];
        var requiredType = this.getTypeName(
            interpreter.visit(exprefNode, sortedArray[0]));
        if (_indexOf(["number", "string"], requiredType) < 0) {
            throw new Error("TypeError");
        }
        var that = this;
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        var decorated = [];
        for (var i = 0; i < sortedArray.length; i++) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort(function(a, b) {
          var exprA = interpreter.visit(exprefNode, a[1]);
          var exprB = interpreter.visit(exprefNode, b[1]);
          if (that.getTypeName(exprA) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that.getTypeName(exprA));
          } else if (that.getTypeName(exprB) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that.getTypeName(exprB));
          }
          if (exprA > exprB) {
            return 1;
          } else if (exprA < exprB) {
            return -1;
          } else {
            // If they're equal compare the items by their
            // order to maintain relative order of equal keys
            // (i.e. to get a stable sort).
            return a[0] - b[0];
          }
        });
        // Undecorate: extract out the original list elements.
        for (var j = 0; j < decorated.length; j++) {
          sortedArray[j] = decorated[j][1];
        }
        return sortedArray;
    },

    functionMaxBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, ["number", "string"]);
      var maxNumber = -Infinity;
      var maxRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current > maxNumber) {
          maxNumber = current;
          maxRecord = resolvedArray[i];
        }
      }
      return maxRecord;
    },

    functionMinBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, ["number", "string"]);
      var minNumber = Infinity;
      var minRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current < minNumber) {
          minNumber = current;
          minRecord = resolvedArray[i];
        }
      }
      return minRecord;
    },

    createKeyFunction: function(exprefNode, allowedTypes) {
      var that = this;
      var interpreter = this.interpreter;
      var keyFunc = function(x) {
        var current = interpreter.visit(exprefNode, x);
        if (_indexOf(allowedTypes, that.getTypeName(current)) < 0) {
          var msg = "TypeError: expected one of " + allowedTypes +
                    ", received " + that.getTypeName(current);
          throw new Error(msg);
        }
        return current;
      };
      return keyFunc;
    }

  };

  function compile(stream) {
    var parser = new Parser();
    var ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
      var lexer = new Lexer();
      return lexer.tokenize(stream);
  }

  function search(data, expression) {
      var parser = new Parser();
      // This needs to be improved.  Both the interpreter and runtime depend on
      // each other.  The runtime needs the interpreter to support exprefs.
      // There's likely a clean way to avoid the cyclic dependency.
      var runtime = new Runtime();
      var interpreter = new TreeInterpreter(runtime);
      runtime.interpreter = interpreter;
      var node = parser.parse(expression);
      return interpreter.search(node, data);
  }

  exports.tokenize = tokenize;
  exports.compile = compile;
  exports.search = search;
  exports.Parser = Parser;
  exports.strictDeepEqual = strictDeepEqual;
})(typeof exports === "undefined" ? this.jmespath = {} : exports);

},{"lodash._basetostring":2,"lodash.indexof":3,"lodash.isarray":7,"lodash.isobject":8,"lodash.keys":9,"lodash.lastindexof":12}],2:[function(_dereq_,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],3:[function(_dereq_,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = _dereq_('lodash._baseindexof'),
    binaryIndex = _dereq_('lodash._binaryindex');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it is used as the offset
 * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
 * performs a faster binary search.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {boolean|number} [fromIndex=0] The index to search from or `true`
 *  to perform a binary search on a sorted array.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // using `fromIndex`
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 *
 * // performing a binary search
 * _.indexOf([1, 1, 2, 2], 2, true);
 * // => 2
 */
function indexOf(array, value, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
  } else if (fromIndex) {
    var index = binaryIndex(array, value);
    if (index < length &&
        (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
      return index;
    }
    return -1;
  }
  return baseIndexOf(array, value, fromIndex || 0);
}

module.exports = indexOf;

},{"lodash._baseindexof":4,"lodash._binaryindex":5}],4:[function(_dereq_,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{}],5:[function(_dereq_,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var binaryIndexBy = _dereq_('lodash._binaryindexby');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * Performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function binaryIndex(array, value, retHighest) {
  var low = 0,
      high = array ? array.length : low;

  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = (low + high) >>> 1,
          computed = array[mid];

      if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return binaryIndexBy(array, value, identity, retHighest);
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = binaryIndex;

},{"lodash._binaryindexby":6}],6:[function(_dereq_,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/* Native method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeMin = Math.min;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/**
 * This function is like `binaryIndex` except that it invokes `iteratee` for
 * `value` and each element of `array` to compute their sort ranking. The
 * iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function binaryIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);

  var low = 0,
      high = array ? array.length : 0,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsUndef = value === undefined;

  while (low < high) {
    var mid = nativeFloor((low + high) / 2),
        computed = iteratee(array[mid]),
        isDef = computed !== undefined,
        isReflexive = computed === computed;

    if (valIsNaN) {
      var setLow = isReflexive || retHighest;
    } else if (valIsNull) {
      setLow = isReflexive && isDef && (retHighest || computed != null);
    } else if (valIsUndef) {
      setLow = isReflexive && (retHighest || isDef);
    } else if (computed == null) {
      setLow = false;
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

module.exports = binaryIndexBy;

},{}],7:[function(_dereq_,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],8:[function(_dereq_,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],9:[function(_dereq_,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = _dereq_('lodash._getnative'),
    isArguments = _dereq_('lodash.isarguments'),
    isArray = _dereq_('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":10,"lodash.isarguments":11,"lodash.isarray":7}],10:[function(_dereq_,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],11:[function(_dereq_,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{}],12:[function(_dereq_,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var binaryIndex = _dereq_('lodash._binaryindex');

/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {boolean|number} [fromIndex=array.length-1] The index to search from
 *  or `true` to perform a binary search on a sorted array.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.lastIndexOf([1, 2, 1, 2], 2);
 * // => 3
 *
 * // using `fromIndex`
 * _.lastIndexOf([1, 2, 1, 2], 2, 2);
 * // => 1
 *
 * // performing a binary search
 * _.lastIndexOf([1, 1, 2, 2], 2, true);
 * // => 3
 */
function lastIndexOf(array, value, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = length;
  if (typeof fromIndex == 'number') {
    index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
  } else if (fromIndex) {
    index = binaryIndex(array, value, true) - 1;
    var other = array[index];
    if (value === value ? (value === other) : (other !== other)) {
      return index;
    }
    return -1;
  }
  if (value !== value) {
    return indexOfNaN(array, index, true);
  }
  while (index--) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = lastIndexOf;

},{"lodash._binaryindex":13}],13:[function(_dereq_,module,exports){
module.exports=_dereq_(5)
},{"lodash._binaryindexby":14}],14:[function(_dereq_,module,exports){
module.exports=_dereq_(6)
},{}]},{},[1])
(1)
});