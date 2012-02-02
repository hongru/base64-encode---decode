/**
 * base64 encoding & decoding
 * for fixing browsers which don't support Base64 | btoa |atob
 */

(function (win, undefined) {
 
 	var Base64 = function () {
		var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		
		// btoa method
		function _btoa (s) {
			if (/([^\u0000-\u00ff])/.test(s)) {
				throw new Error('INVALID_CHARACTER_ERR');
			}	
			var i = 0,
				prev,
				ascii,
				mod,
				result = [];

			while (i < s.length) {
				ascii = s.charCodeAt(i);
				mod = i % 3;

				switch(mod) {
					// ��һ��6λֻ��Ҫ��8λ������������λ
					case 0:
						result.push(base64hash.charAt(ascii >> 2));
						break;
					//�ڶ���6λ = ��һ��8λ�ĺ���λ + �ڶ���8λ��ǰ4λ
					case 1:
						result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
						break;
					//������6λ = �ڶ���8λ�ĺ�4λ + ������8λ��ǰ2λ
					//��4��6λ = ������8λ�ĺ�6λ
					case 2:
						result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
						result.push(base64hash.charAt(ascii & 0x3f));
						break;
				}

				prev = ascii;
				i ++;
			}

			// ѭ��������mod, Ϊ0 ֤���貹3��6λ����һ��Ϊ���һ��8λ�������λ���油4��0����������6λ��Ӧ�����쳣�ġ�=����
			// modΪ1��֤�����貹����6λ��һ�������һ��8λ�ĺ�4λ������0����һ����Ӧ�쳣�ġ�=��
			if(mod == 0) {
				result.push(base64hash.charAt((prev & 3) << 4));
				result.push('==');
			} else if (mod == 1) {
				result.push(base64hash.charAt((prev & 0x0f) << 2));
				result.push('=');
			}

			return result.join('');
		}

		// atob method
		// ��תencode��˼·����
		function _atob (s) {
			s = s.replace(/\s|=/g, '');
			var cur,
				prev,
				mod,
				i = 0,
				result = [];

			while (i < s.length) {
				cur = base64hash.indexOf(s.charAt(i));
				mod = i % 4;

				switch (mod) {
					case 0:
						//TODO
						break;
					case 1:
						result.push(String.fromCharCode(prev << 2 | cur >> 4));
						break;
					case 2:
						result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
						break;
					case 3:
						result.push(String.fromCharCode((prev & 3) << 6 | cur));
						break;
						
				}

				prev = cur;
				i ++;
			}

			return result.join('');
		}

		return {
			btoa: _btoa,
			atob: _atob,
			encode: _btoa,
			decode: _atob
		};
	}();

	if (!win.Base64) { win.Base64 = Base64 }
	if (!win.btoa) { win.btoa = Base64.btoa }
	if (!win.atob) { win.atob = Base64.atob }

 })(window)
