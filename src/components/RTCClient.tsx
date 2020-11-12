import React, { useEffect } from 'react';

const RTCClient = () => {
	
	const localConnection = new RTCPeerConnection();
	const remoteConnection = new RTCPeerConnection();
	const sendChannel = localConnection.createDataChannel("sendChannel");
	let receiveChannel;

	useEffect(() => {
		const a = async () => {
			await establishConnection();
			await receiveConnection();
			await startConnection();
		}
		a();
	}, []);

	const establishConnection = () => {
		sendChannel.onopen = sendChannelChange;
		sendChannel.onclose = sendChannelChange;
		
		console.log('setting up local connection.');
		localConnection.onicecandidate = e => {
			console.log('local ice firing');
			!e.candidate || remoteConnection.addIceCandidate(e.candidate)
			.catch(handleAddCandidateError);
		}
	}

	const receiveConnection = () => {
		remoteConnection.ondatachannel = receiveChannelCallback;

		console.log('setting up remote connection.');
		remoteConnection.onicecandidate = e => {
			console.log('remote ice firing');
			!e.candidate || localConnection.addIceCandidate(e.candidate)
			.catch(handleAddCandidateError);
		}
	}

	const startConnection = () => {
		console.log('starting connection');
		localConnection.createOffer()
		.then(offer => localConnection.setLocalDescription(offer))
		.then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
		.then(() => remoteConnection.createAnswer())
		.then(answer => remoteConnection.setLocalDescription(answer))
		.then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
		.catch(handleCreateOfferError);
	}

	const handleAddCandidateError = () => {
		console.log('add error');
	}

	const handleCreateOfferError = () => {
		console.log('create error');
	}

	const sendChannelChange = () => {
		console.log('sendchannel');		
	}

	const sendMessage = () => {
		sendChannel.send("hello there");
	}

	const receiveChannelCallback = (event) => {
		receiveChannel = event.channel;
		receiveChannel.onmessage = handleReceiveMessage;
		receiveChannel.onopen = handleReceiveChannelChange;
		receiveChannel.onclose = handleReceiveChannelChange;
		console.log('receivechannel');
	}

	const handleReceiveMessage = event => {
		console.log(`message received: ${event.data}`);
	}

	const handleReceiveChannelChange = () => {
		console.log('receive change');
	}
	
	return (<div className="rtcclient">
	{"RTCClient!"}
	<button onClick={sendMessage}>Send Message</button>
	</div>);
}

export {
	RTCClient
}
