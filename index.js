/**
 * Created by macbook on 3/5/18.
 */

/*
 I use ZMQ and
 and protocol buffers
 here we can augment it with the id of user
*/
//var ByteBuffer = require("bytebuffer");
let Mic = require('/Users/macbook/Documents/express/mytests/microphoneStreamProject/microhone/ver3/microphone.js');

let mic = new Mic();
let micStream = mic.startRecording();
//micStream.pipe( myWritableStream );
setTimeout(() => {
    //logger.info('stopped recording');
    mic.stopRecording();
}, 3000);
mic.on('info', (info) => {

    console.log(info);
    //var buf = Buffer.from('abc');

  //  console.log("buf="+buf);
console.log("typeof info="+typeof info);
//info[0] is decimal you can check at:
    //https://www.branah.com/ascii-converter

//console.log("Object.keys(info)="+Object.keys(info));
    console.log("info[0]="+info[0]);
    console.log("info[1]="+info[1]);
    console.log("info[1]="+info[2]);


    var protobuf=require("protobufjs");

     protobuf.load("speech.proto", function(err, root) {
        if (err)
            throw err;

        // Obtain a message type
        var AwesomeMessage = root.lookupType("speechPackage.Speech");
/*
         var bb = new ByteBuffer();
         //bb.writeIString('Testing 1,2,3');
         bb.writeIString(info.toString());
         bb.flip();
*/
        // Exemplary payload
        var payload = {
            userId: "I5543",
            //signal: "dd f fsd sdfs  222"
            signal:info
        };

        // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        var errMsg = AwesomeMessage.verify(payload);
        if (errMsg)
            throw Error(errMsg);

        // Create a new message
        var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = AwesomeMessage.encode(message).finish();

         // ... do something with buffer
         //console.log("here buffer="+buffer);
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = AwesomeMessage.decode(buffer);
        // ... do something with message
        console.log("decoded message.userId="+message.userId);
        console.log("decoded message.signal="+message.signal);
        //console.log("typeof="+typeof  message.signal.toJSON())
         //console.log("keys="+Object.keys(message))

         // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

        // Maybe convert the message back to a plain object

        var object = AwesomeMessage.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
            // see ConversionOptions
        });
        // console.log("object.userId="+object.userId);
        // console.log("object="+object.signal);

     });


});
mic.on('error', (error) => {
    console.log(error);
});

