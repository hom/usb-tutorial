const usb = require('usb')
usb.on('attach', (device) => {
  console.log('\n添加了设备：')
  console.log(device)
})

usb.on('detach', (device) => {
  console.log('\n拔出了设备：')
  console.log(device)
})

// 获取所有的设备
// const list = usb.getDeviceList()
// console.log(list)

// 通过 Vid 和 Pid 查找设备
const device = usb.findByIds(12625, 20651)
console.log(device)
console.log(device.deviceAddress)

device.open()
console.log(device.deviceAddress)
console.log('\n')

console.log(device.interfaces)
console.log('\n')
const interface = device.interface(1)
interface.claim()
console.log(device.interface(1))
console.log(interface.endpoint(device.deviceAddress))
// console.log(interface.endpoints)

const endpoints = interface.endpoints
const [inEndpoint, outEndpoint] = endpoints
console.log(inEndpoint)
console.log(outEndpoint)

console.log(inEndpoint.direction)
console.log(outEndpoint.direction)

// inEndpoint.transferType = 2;
// inEndpoint.startStream(1, 64);
inEndpoint.startPoll(3, 64)
setTimeout(() => {
  inEndpoint.stopPoll(() => {
    console.log(Buffer.concat([Buffer.from([0x0d, 0xe7, 0x01, 0x8c, 0xe0]), Buffer.alloc(59)], 64))
    outEndpoint.transfer(Buffer.concat([Buffer.from([0x0d, 0xe7, 0x01, 0x8c, 0xe0]), Buffer.alloc(59)], 64), function (error) {
      if (error) {
        console.log(error);
      }
    });

    // outEndpoint.claim()
    // outEndpoint.startStream(1, 64);
    outEndpoint.transfer(Buffer.concat([Buffer.from([0x0d, 0xe7, 0x01, 0x88, 0xe0]), Buffer.alloc(59)], 64), function (error) {
      if (error) {
        console.log(error);
      }
    });
  })
}, 30 * 1000);
// inEndpoint.transfer(64, function (error, data) {
//     if (!error) {
//       console.log('\nTransfer: ')
//         console.log(data);
//     } else {
//         console.log(error);
//     }
// });
inEndpoint.on('data', function (data) {
  console.log('\n收到数据：')
    console.log(data);
});
inEndpoint.on('error', function (error) {
    console.log(error);
});

// outEndpoint.claim()
// outEndpoint.startStream(1, 64);
console.log(Buffer.concat([Buffer.from([0x0d, 0xe7, 0x01, 0x8a, 0xe0]), Buffer.alloc(59)], 64))
outEndpoint.transfer(Buffer.concat([Buffer.from([0x0d, 0xe7, 0x01, 0x8a, 0xe0]), Buffer.alloc(59)], 64), function (error) {
  if (error) {
    console.log(error);
  }
});

// outEndpoint.claim()
// outEndpoint.startStream(1, 64);
outEndpoint.transfer(Buffer.concat([Buffer.from([0x0d, 0xe7, 0x01, 0x8e, 0xe0]), Buffer.alloc(59)], 64), function (error) {
  if (error) {
    console.log(error);
  }
});

// outEndpoint.claim()
// outEndpoint.startStream(1, 64);
// outEndpoint.transfer(Buffer.from([0x0d, 0xe7, 0x01, 0x8a, 0xe0]), function (error) {
//     console.log(error);
// });

// outEndpoint.transfer(Buffer.from([0x0d, 0xe7, 0x01, 0x8a, 0xe0]), (error) => {
//   console.error(error )
// })

