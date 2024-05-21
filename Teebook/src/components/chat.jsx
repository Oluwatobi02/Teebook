import { useEffect } from "react";

const Chat = () => {

    const options = {
        method: 'POST',
        headers: {
          'xi-api-key': '12cac17112c1536fcc60742191d4c4df',
        },
        
        body: JSON.stringify({"text":"Hello my name is Tobi, how may i help you","model_id":"eleven_multilingual_v2","voice_settings":{"stability":0.53,"similarity_boost":0.75}})
      };
    //   useEffect(() => {
        function handleClick() {
          fetch('https://api.elevenlabs.io/v1/text-to-speech/TWUKKXAylkYxxlPe4gx0', options)
            .then(response => response.blob())
            .then((response) => {
                const audio = new Audio(URL.createObjectURL(response));
                audio.play();
            })
            .catch(err => console.error(err));
        }

    //   },[])
  return (
    <div>
        
      <button onClick={handleClick}>Chat</button>
    </div>
  )
}

export default Chat
