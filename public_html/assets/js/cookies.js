class Cookies {
	static COOKIE_NAME = 'countdownCookies';
	
	static setCookie(cname, cvalue) {
		const d = new Date();
		d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
		const expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
	static getCookie(cname) {
		const name = cname + "=";
		const decodedCookie = decodeURIComponent(document.cookie);
		const ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if(c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
	static deleteCookie(name) {
		document.cookie = name + '=; Max-Age=-99999999;';
	}
	
	static getPageCookies() {
		let pageCookies = Cookies.getCookie(Cookies.COOKIE_NAME);
		
		if(pageCookies.length === 0) {
			return [];
		}
		
		const cookies = [];
		JSON.parse(pageCookies).forEach((cookie) => {
			cookies.push(JSON.parse(cookie));
		});
		return cookies;
	}
	
	static savePageCookies(pageCookies) {
		const cookies = [];
		pageCookies.forEach((cookie) => cookies.push(JSON.stringify(cookie)));
		Cookies.setCookie(Cookies.COOKIE_NAME, JSON.stringify(cookies));
	}
	
	static appendPageCookie(cookie) {
		const pageCookies = Cookies.getPageCookies();
		
		if(pageCookies.findIndex((c) => c.id === cookie.id) === -1) {
			pageCookies.push(cookie);
		}
		
		Cookies.savePageCookies(pageCookies);
	}
	
	static deletePageCookie(id) {
		let pageCookies = Cookies.getPageCookies();
		pageCookies = pageCookies.filter((c => c.id !== id));
		Cookies.savePageCookies(pageCookies);
	}
}

