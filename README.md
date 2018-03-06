wrapping a microphone signal into a protocol buffer
===================================
*application*
You want to create a speech recognition API such that IOT devices such as a sensor that is connected
to a raspberry pie3 can listen to the voices around and doing speech recognition or translation.
You need to create a wrapper and pass it to ZMQ for example.
*steps are:*
- listen:we spawn a child_process to start processes of recording from microphone
- using protocol buffer to wrap the microphone data as bytes and attach a userId to distinguish
 different users that are using our speech recognition API. passing id of the person to the class to make a unified message
-Now you can use any method such as kafka,ZMQ,streams,... to consume the data
listening to the microphone
--------------
*Message*
**Stream**
- linux
- mac  has some issues :need to be resolved
- windows

protocol buffer
--------------
it is designed by google to pass data . we use marshaling and demarshaling.

