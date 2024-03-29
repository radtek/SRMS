layui.define(["larryms"], function (a) {
	var c = layui.$, t = layui.layer, e = layui.larryms, r = layui.element;
	var i = function () {
		this.config = {name: "", offsetX: 2, offsetY: 2, textLimit: 16, beforeShow: c.noop, afterShow: c.noop};
		this.params = "";
		this._data = ""
	};
	var d = c(document).data("func", {});
	var n = c("body");
	i.prototype.ContentMenu = function (a, t, e) {
		var f = this;
		f._data = a;
		f.params = c.extend(true, f.config, t || {});
		e.each(function () {
			this.oncontextmenu = function (a) {
				if (c.isFunction(f.params.beforeShow)) {
					f.params.beforeShow.call(this)
				}
				a = a || window.event;
				a.cancelBubble = true;
				if (a.stopPropagation) {
					a.stopPropagation()
				}
				f.hide();
				var t = d.scrollTop();
				var e = f.funLarryMenu(f._data);
				if (e) {
					var r, i;
					var n = c(window).width();
					var s = c(window).height();
					var l = c("div.larryMenuBox").width();
					var o = c("div.larryMenuBox").height();
					if (n < a.clientX + f.params.offsetX + l) {
						r = a.clientX - f.params.offsetX - l;
						e.find("ul li").children("div.larryMenuBox").css({top: "-35px", left: -(l + 2)})
					} else {
						r = a.clientX + f.params.offsetX;
						e.find("ul li").children("div.larryMenuBox").css({top: "-1px", left: l - 5})
					}
					if (s < a.clientY + f.params.offsetY + o) {
						i = a.clientY - f.params.offsetY - o
					} else {
						i = a.clientY + t + f.params.offsetY
					}
					e.css({display: "block", left: r, top: i});
					d.data("target", e);
					d.data("trigger", this);
					if (c.isFunction(f.params.afterShow)) {
						f.params.afterShow.call(this)
					}
					return false
				}
			}
		});
		if (!n.data("bind")) {
			n.bind("click", f.hide).data("bind", true)
		}
	};
	i.prototype.htmlCreateMenu = function (a) {
		var l = this;
		var t = a || l._data, e = a ? Math.random().toString() : l.params.name, o = "", r = "", f = "larry_menu_";
		if (c.isArray(t) && t.length) {
			o = '<div id="larryMenu_' + e + '" class="' + f + 'box larryMenuBox">' + '<div class="' + f + 'body">' + '<ul class="' + f + 'ul">';
			c.each(t, function (a, t) {
				if (a) {
					o += '<li class="' + f + 'li_separate">&nbsp;</li>'
				}
				if (c.isArray(t)) {
					c.each(t, function (a, t) {
						var e = t.text, r = "", i = "", n = Math.random().toString().replace(".", "");
						if (e) {
							if (e.length > l.params.textLimit) {
								e = e.slice(0, l.params.textLimit) + "…";
								i = ' title="' + t.text + '"'
							}
							if (c.isArray(t.data) && t.data.length) {
								r = '<li class="' + f + 'li" data-hover="true">' + l.htmlCreateMenu(t.data) + '<a href="javascript:" class="' + f + 'a"' + i + ' data-key="' + n + '"><i class="' + f + 'triangle"></i>' + e + "</a>" + "</li>"
							} else {
								r = '<li class="' + f + 'li">' + '<a href="javascript:" class="' + f + 'a"' + i + ' data-key="' + n + '">' + e + "</a>" + "</li>"
							}
							o += r;
							var s = d.data("func");
							s[n] = t.func;
							d.data("func", s)
						}
					})
				}
			});
			o += "</ul>" + "</div>" + "</div>"
		}
		return o
	};
	i.prototype.funLarryMenu = function () {
		var e = this;
		var a = "#larryMenu_", r = "larry_menu_", t = c(a + e.params.name);
		if (!t.size()) {
			c("body").append(e.htmlCreateMenu());
			c(a + e.params.name + " a").bind("click", function () {
				var a = c(this).attr("data-key"), t = d.data("func")[a];
				if (c.isFunction(t)) {
					t.call(d.data("trigger"))
				}
				e.hide();
				return false
			});
			c(a + e.params.name + " li").each(function () {
				var t = c(this).attr("data-hover"), e = r + "li_hover";
				c(this).hover(function () {
					var a = c(this).siblings("." + e);
					a.removeClass(e).children("." + r + "box").hide();
					a.children("." + r + "a").removeClass(r + "a_hover");
					if (t) {
						c(this).addClass(e).children("." + r + "box").show();
						c(this).children("." + r + "a").addClass(r + "a_hover")
					}
				})
			});
			return c(a + e.params.name)
		}
		return t
	};
	i.prototype.hide = function () {
		var a = d.data("target");
		if (a && a.css("display") === "block") {
			a.hide()
		}
	};
	i.prototype.remove = function () {
		var a = d.data("target");
		if (a) {
			a.remove()
		}
	};
	var s = new i;
	a("larryMenu", function () {
		return s
	})
});