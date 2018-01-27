import $ from 'jquery';

var banner;

// Component for this class can be found at src/components/shared/BannerComp.js
class Banner {

  constructor() {
    this.elId = 'banner';
    this.bannerMsgClass = 'banner-msg';

    this.slideDuration = 350; // make sure this matches $banner-slide-duration inside banner.scss
    this.showClass = 'show';
    this.errorClass = 'error';
    this.successClass = 'success';

    this.msgTypes = {
      ERROR: -1,
      NEUTRAL: 0,
      SUCCESS: 1
    };

    this.el = this.el.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.classForMsgType = this.classForMsgType.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.error = this.error.bind(this);
    this.neutral = this.neutral.bind(this);
    this.success = this.success.bind(this);
  }

  el() {
    return $('#' + this.elId);
  }

  show(msgType) {
    msgType = msgType || this.msgTypes.NEUTRAL;

    const el = this.el();

    if (!el) {
      return;
    }

    el.show();

    const msgTypeClass = this.classForMsgType(msgType);

    if (msgTypeClass) {
      el.addClass(msgTypeClass);
    }

    setTimeout(() => {
      el.addClass(this.showClass);
    }, 5);
  }

  hide() {
    const el = this.el();

    if (!el) {
      return;
    }

    el.removeClass(this.showClass);

    setTimeout(() => {
      el.hide();
      el.removeClass([this.errorClass, this.successClass].join(' '));
    }, this.slideDuration + 100);
  }

  classForMsgType(msgType) {
    switch (msgType) {
    case this.msgTypes.ERROR:
      return this.errorClass;
    case this.msgTypes.SUCCESS:
      return this.successClass;
    default:
      return null;
    }
  }

  updateMessage(msg) {
    $('#' + this.elId + ' > .' + this.bannerMsgClass).html(msg);
  }

  error(msg) {
    this.updateMessage(msg);
    this.show(this.msgTypes.ERROR);
  }

  neutral(msg) {
    this.updateMessage(msg);
    this.show(this.msgTypes.NEUTRAL);
  }

  success(msg) {
    this.updateMessage(msg);
    this.show(this.msgTypes.SUCCESS);
  }
}

function getInstance() {
  if (!banner) {
    banner = new Banner();
  }

  return banner;
}

export default getInstance();