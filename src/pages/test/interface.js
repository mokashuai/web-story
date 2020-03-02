const common = {
  id: 974,
  label: "姓名",
  disabled: false,
  required: false,
  options: [{label: '', value: 1}],
  placeholder: '',
}

const list = [{
  fieldName: "realname",
  type: 'image',//0图片
  value: [{
    "name": "图片1",
    "url": "https://cdn.storage.com/att/asdfoi2398asdf.doc"
  }]
}, {
  fieldName: "realname",
  type: 'input',//1单行文本
  value: "陈林"
}, {
  fieldName: "on_boarding_date",
  label: "入职日期",
  type: 'date',//2日期
  value: 1561996800000
}, {
  fieldName: "",
  label: "人数",
  type: 'number',//3数字
  value: 15
}, {
  fieldName: "on_boarding_plan",
  label: "单选下拉",
  type: 'select',//4是非
  value: [{
    "id": 5,
    "name": "CTO"
  }]
}, {
  fieldName: "on_boarding_plan",
  label: "入职计划",
  type: 'select',//5单选
  value: [{id: 3, name: "Moka非产研入职计划"}]
}, {
  fieldName: "office_address",
  label: "工作地点",
  type: 'address',//6	地址
  value: {
    province: {code: "130000", name: "北京总部"},
    city: {code: "130200", name: "唐山市"},
    county: {code: "130208", name: "丰润区"},
    detail: "丰收大街 3 号"
  }
}, {
  fieldName: "telephone",
  label: "电话",
  options: [{"display":"+86","value":"+86"},{"display":"+1","value":"+1"},{"display":"+20","value":"+20"},{"display":"+211","value":"+211"},{"display":"+212","value":"+212"},{"display":"+213","value":"+213"},{"display":"+216","value":"+216"},{"display":"+218","value":"+218"},{"display":"+220","value":"+220"},{"display":"+221","value":"+221"},{"display":"+222","value":"+222"},{"display":"+223","value":"+223"},{"display":"+224","value":"+224"},{"display":"+225","value":"+225"},{"display":"+226","value":"+226"},{"display":"+227","value":"+227"},{"display":"+228","value":"+228"},{"display":"+229","value":"+229"},{"display":"+230","value":"+230"},{"display":"+231","value":"+231"},{"display":"+232","value":"+232"},{"display":"+233","value":"+233"},{"display":"+234","value":"+234"},{"display":"+235","value":"+235"},{"display":"+236","value":"+236"},{"display":"+237","value":"+237"},{"display":"+238","value":"+238"},{"display":"+239","value":"+239"},{"display":"+240","value":"+240"},{"display":"+241","value":"+241"},{"display":"+242","value":"+242"},{"display":"+243","value":"+243"},{"display":"+244","value":"+244"},{"display":"+245","value":"+245"},{"display":"+246","value":"+246"},{"display":"+247","value":"+247"},{"display":"+248","value":"+248"},{"display":"+249","value":"+249"},{"display":"+250","value":"+250"},{"display":"+251","value":"+251"},{"display":"+252","value":"+252"},{"display":"+253","value":"+253"},{"display":"+254","value":"+254"},{"display":"+255","value":"+255"},{"display":"+256","value":"+256"},{"display":"+257","value":"+257"},{"display":"+258","value":"+258"},{"display":"+259","value":"+259"},{"display":"+260","value":"+260"},{"display":"+261","value":"+261"},{"display":"+262","value":"+262"},{"display":"+263","value":"+263"},{"display":"+264","value":"+264"},{"display":"+265","value":"+265"},{"display":"+266","value":"+266"},{"display":"+267","value":"+267"},{"display":"+268","value":"+268"},{"display":"+269","value":"+269"},{"display":"+27","value":"+27"},{"display":"+290","value":"+290"},{"display":"+291","value":"+291"},{"display":"+297","value":"+297"},{"display":"+298","value":"+298"},{"display":"+299","value":"+299"},{"display":"+30","value":"+30"},{"display":"+31","value":"+31"},{"display":"+32","value":"+32"},{"display":"+33","value":"+33"},{"display":"+34","value":"+34"},{"display":"+350","value":"+350"},{"display":"+351","value":"+351"},{"display":"+352","value":"+352"},{"display":"+353","value":"+353"},{"display":"+354","value":"+354"},{"display":"+355","value":"+355"},{"display":"+356","value":"+356"},{"display":"+357","value":"+357"},{"display":"+358","value":"+358"},{"display":"+359","value":"+359"},{"display":"+36","value":"+36"},{"display":"+37","value":"+37"},{"display":"+370","value":"+370"},{"display":"+371","value":"+371"},{"display":"+372","value":"+372"},{"display":"+373","value":"+373"},{"display":"+374","value":"+374"},{"display":"+375","value":"+375"},{"display":"+376","value":"+376"},{"display":"+377","value":"+377"},{"display":"+378","value":"+378"},{"display":"+379","value":"+379"},{"display":"+38","value":"+38"},{"display":"+380","value":"+380"},{"display":"+381","value":"+381"},{"display":"+382","value":"+382"},{"display":"+385","value":"+385"},{"display":"+386","value":"+386"},{"display":"+387","value":"+387"},{"display":"+388","value":"+388"},{"display":"+389","value":"+389"},{"display":"+39","value":"+39"},{"display":"+40","value":"+40"},{"display":"+41","value":"+41"},{"display":"+42","value":"+42"},{"display":"+420","value":"+420"},{"display":"+421","value":"+421"},{"display":"+423","value":"+423"},{"display":"+43","value":"+43"},{"display":"+44","value":"+44"},{"display":"+45","value":"+45"},{"display":"+46","value":"+46"},{"display":"+47","value":"+47"},{"display":"+48","value":"+48"},{"display":"+49","value":"+49"},{"display":"+500","value":"+500"},{"display":"+501","value":"+501"},{"display":"+502","value":"+502"},{"display":"+503","value":"+503"},{"display":"+504","value":"+504"},{"display":"+505","value":"+505"},{"display":"+506","value":"+506"},{"display":"+507","value":"+507"},{"display":"+508","value":"+508"},{"display":"+509","value":"+509"},{"display":"+51","value":"+51"},{"display":"+52","value":"+52"},{"display":"+53","value":"+53"},{"display":"+54","value":"+54"},{"display":"+55","value":"+55"},{"display":"+56","value":"+56"},{"display":"+57","value":"+57"},{"display":"+58","value":"+58"},{"display":"+590","value":"+590"},{"display":"+591","value":"+591"},{"display":"+592","value":"+592"},{"display":"+593","value":"+593"},{"display":"+594","value":"+594"},{"display":"+595","value":"+595"},{"display":"+596","value":"+596"},{"display":"+597","value":"+597"},{"display":"+598","value":"+598"},{"display":"+599","value":"+599"},{"display":"+599","value":"+599"},{"display":"+599","value":"+599"},{"display":"+60","value":"+60"},{"display":"+61","value":"+61"},{"display":"+62","value":"+62"},{"display":"+63","value":"+63"},{"display":"+64","value":"+64"},{"display":"+65","value":"+65"},{"display":"+66","value":"+66"},{"display":"+670","value":"+670"},{"display":"+672","value":"+672"},{"display":"+673","value":"+673"},{"display":"+674","value":"+674"},{"display":"+675","value":"+675"},{"display":"+676","value":"+676"},{"display":"+677","value":"+677"},{"display":"+678","value":"+678"},{"display":"+679","value":"+679"},{"display":"+680","value":"+680"},{"display":"+681","value":"+681"},{"display":"+682","value":"+682"},{"display":"+683","value":"+683"},{"display":"+685","value":"+685"},{"display":"+686","value":"+686"},{"display":"+687","value":"+687"},{"display":"+688","value":"+688"},{"display":"+689","value":"+689"},{"display":"+690","value":"+690"},{"display":"+691","value":"+691"},{"display":"+692","value":"+692"},{"display":"+7","value":"+7"},{"display":"+81","value":"+81"},{"display":"+82","value":"+82"},{"display":"+84","value":"+84"},{"display":"+850","value":"+850"},{"display":"+852","value":"+852"},{"display":"+853","value":"+853"},{"display":"+855","value":"+855"},{"display":"+856","value":"+856"},{"display":"+870","value":"+870"},{"display":"+878","value":"+878"},{"display":"+880","value":"+880"},{"display":"+881","value":"+881"},{"display":"+882","value":"+882"},{"display":"+886","value":"+886"},{"display":"+90","value":"+90"},{"display":"+91","value":"+91"},{"display":"+92","value":"+92"},{"display":"+93","value":"+93"},{"display":"+94","value":"+94"},{"display":"+95","value":"+95"},{"display":"+960","value":"+960"},{"display":"+961","value":"+961"},{"display":"+962","value":"+962"},{"display":"+963","value":"+963"},{"display":"+964","value":"+964"},{"display":"+965","value":"+965"},{"display":"+966","value":"+966"}],
  type: 'mobile',//7电话
  value: {
    country_code: "+86",
    value: 152748823659
  }
}, {
  fieldName: "contact_attachment",
  label: "合同附件",
  type: "attachment",//8附件
  value: [{ name: '合同', url: 'www.baidu.com' }]
}, {
  fieldName: "id_no",
  label: "证件号码",
  type: 'certificate',//9
  options: [{"display":"身份证","value":1},{"display":"护照","value":2},{"display":"港澳来往内地通行证","value":3},{"display":"台湾来往内地通行证","value":4}],
  value: {
    "id_type_value": "1",
    "id_type_display": "身份证",
    "id_no": "110123199501025478"
  }
}, {
  fieldName: "bank_card",
  label: "银行卡",
  type: 'number',//10银行卡
  value: 62245258516898755
}, {
  fieldName: "leave_detail_reason",
  label: "离职详细原因",
  type: 'textarea',//11多行文本
  value: "备注"
}, {
  fieldName: "department",//"duty""position","position_rank","work_address","employee","center","event_type","event_reason"
  label: "职务",//"职位", "职级", "工作地点", "人员单选", "成本中心", "事件类型", "事件原因"
  type: "select",//12~20,
  "value": [{
    "id": 3,
    "name": "主动离职"
  }]
}]

const fields = list.map(item => ({...common, ...item}));
