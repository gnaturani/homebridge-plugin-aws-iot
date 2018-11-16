Connect your HomeBridge for call topic on AWS-IOT.

When call operation on your switch, send message to topic specified conneted to your AWS-IOT


INSTALL BEFORE

https://github.com/aws/aws-iot-device-sdk-js

npm install -g aws-iot-device-sdk


Simple configuration:

    {
      "accessory": "AWS-IOT",
      "name": "name of your device",
      "switchType": "stateful",  // (check?!?)
      "topic": "name_of_your_topic_to_call",
      "cafile": "/path/to/rootCA.pem",
      "cert": "/path/to/certificate.pem",
      "key": "/path/to/private.key",
      "endpoint": "xxxxxxxxxx-ats.iot.eu-west-1.amazonaws.com",
      "port": "8883",
      "message": "{ \"command\": \"open\" }"
    }# homebridge-plugin-aws-iot
