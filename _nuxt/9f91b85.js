(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1287:function(e,t,o){"use strict";o.r(t);var d={layout:"admin",created:function(){this.$store.dispatch("admin/device/getDevice")},data:function(){return{show:{add:!1,edit:!1},form:{add:{deviceName:""},edit:{deviceName:""}}}},methods:{open:function(e){location.href=e}}},c=o(57),component=Object(c.a)(d,(function(){var e=this,t=e._self._c;return t("div",[t("a-row",[t("a-space",{staticClass:"float-right"},[t("a-button",{attrs:{type:"primary"},on:{click:function(t){e.show.add=!0}}},[e._v("新增")]),e._v(" "),t("a-button",{attrs:{ghost:"",type:"primary"},on:{click:function(t){return e.$store.dispatch("admin/device/refreshDevice")}}},[e._v(" 刷新 ")])],1)],1),e._v(" "),t("a-row",[t("a-list",{attrs:{grid:{gutter:16,column:4},"data-source":e.$store.state.admin.device.data.device},scopedSlots:e._u([{key:"renderItem",fn:function(o,d){return t("a-list-item",{staticClass:"w-[17rem]"},[t("a-card",{attrs:{hoverable:""}},[t("img",{attrs:{slot:"cover",src:e.$store.state.admin.device.data.screen[o.deviceToken]?"data:image/jpeg;base64,".concat(e.$store.state.admin.device.data.screen[o.deviceToken]):"/icon.png"},on:{click:function(t){o.region&&e.open(e.$store.state.admin.device.data.control[o.deviceToken])}},slot:"cover"}),e._v(" "),t("template",{staticClass:"ant-card-actions",slot:"actions"},[t("a-icon",{attrs:{type:"edit"},on:{click:function(){e.form.edit=e.$copy(o),e.show.edit=!0}}}),e._v(" "),o.region?t("a-icon",{attrs:{type:"control"},on:{click:function(t){return e.open(e.$store.state.admin.device.data.control[o.deviceToken])}}}):e._e(),e._v(" "),t("a-icon",{attrs:{type:"delete"},on:{click:function(t){return e.$store.dispatch("admin/device/deleteDevice",{id:o.id})}}})],1),e._v(" "),t("a-card-meta",{attrs:{title:o.deviceName,description:o.deviceToken}},[t("a-avatar",{class:{"bg-gray-400":"离线"===o.status,"bg-blue-400":"在线"===o.status,"bg-yellow-400":"日常"===o.status,"bg-red-400":"肉鸽"===o.status},attrs:{slot:"avatar",size:"large"},slot:"avatar"},[e._v("\n              "+e._s(o.status)+"\n            ")])],1)],2)],1)}}])})],1),e._v(" "),t("a-modal",{attrs:{title:"新增设备",okText:"确定",cancelText:"取消"},on:{ok:function(t){e.$store.dispatch("admin/device/addDevice",e.form.add)&&(e.show.add=!1)}},model:{value:e.show.add,callback:function(t){e.$set(e.show,"add",t)},expression:"show.add"}},[t("a-input",{attrs:{"addon-before":"设备名称"},model:{value:e.form.add.deviceName,callback:function(t){e.$set(e.form.add,"deviceName",t)},expression:"form.add.deviceName"}})],1),e._v(" "),t("a-modal",{attrs:{title:"编辑设备",okText:"确定",cancelText:"取消"},on:{ok:function(t){e.$store.dispatch("admin/device/editDevice",e.form.edit)&&(e.show.edit=!1)}},model:{value:e.show.edit,callback:function(t){e.$set(e.show,"edit",t)},expression:"show.edit"}},[t("a-input",{attrs:{"addon-before":"设备名称"},model:{value:e.form.edit.deviceName,callback:function(t){e.$set(e.form.edit,"deviceName",t)},expression:"form.edit.deviceName"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);