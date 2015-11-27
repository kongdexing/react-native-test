'use strict'

var StringUtil = {

 	strTrim(result){
		if (result==null) {
			return "";
		};
		return result.replace(/(^\s*)|(\s*$)/g, ""); 
	}
}

module.exports = StringUtil;