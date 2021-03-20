const audioselecct = (audio) => {
  if (audio) {
    console.log(audio);
    const audioQuality = audio.audio;
    switch (audio) {
      case "AUDIO_QUALITY_MEDIUM":
        return `Medium quality`;
      case "AUDIO_QUALITY_LOW":
        return `Low quality`;
      case "AUDIO_QUALITY_HIGH":
        return `High quality`;
      default:
        return `No audio`;
    }
  }
};

export default audioselecct;
