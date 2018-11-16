var Accessory, Service, Characteristic, UUIDGen;
const request = require('request');
const url = require('url');
var util = require('util');
var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;

module.exports = function (homebridge) {

  console.log("homebridge API version: " + homebridge.version);
  // Accessory must be created from PlatformAccessory Constructor
  Accessory = homebridge.platformAccessory;

  // Service and Characteristic are from hap-nodejs
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;

  homebridge.registerAccessory("awsiot-plugin", "AWS-IOT", myAwsIot);
};


function myAwsIot(log, config) {
    this.log = log;
    this.config = config;
    console.log(config);
    this.accessories = [];
    this.topic = config['topic'];
    this.cafile = config['cafile'];
    this.cert = config['cert'];
    this.key = config['key'];
    this.endpoint = config['endpoint'];
    this.port = config['port'];
    this.message = config['message'];
    this.thing = config['thing'];

    this.homebridgeService = new Service.Switch(this.name);

    /*
    this.homebridgeService.getCharacteristic(Characteristic.On)
        .on("get", this.getStatus.bind(this))
        .on("set", this.setStatus.bind(this));
        */

  }

myAwsIot.prototype = {
    getServices: function () {
      let informationService = new Service.AccessoryInformation();
      informationService
        .setCharacteristic(Characteristic.Manufacturer, "GNaturani")
        .setCharacteristic(Characteristic.Model, "AWS IOT model")
        .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

      let switchService = new Service.Switch("My AWS IOT");
      switchService
        .getCharacteristic(Characteristic.On)
          // .on('get', this.getSwitchOnCharacteristic.bind(this))
          .on('set', this.setSwitchOnCharacteristic.bind(this));

      this.informationService = informationService;
      this.switchService = switchService;
      return [informationService, switchService];
    },

    setSwitchOnCharacteristic: function (on, next) {

        console.log("START setSwitchOnCharacteristic");
        const me = this;
        var awsIot = require('aws-iot-device-sdk');

        var device = awsIot.device({
            keyPath: me.key,
          certPath: me.cert,
            caPath: me.cafile,
          clientId: me.thing,
              host: me.endpoint
        });

        device.publish(me.topic, JSON.stringify(me.message));

        return next();
    }
  };

