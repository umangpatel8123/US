import React, { useEffect, useRef, useState } from 'react';
import './FeelingsPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const videoData = [
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653512/videos/video1_j7mz6g.mp4", text: "I love youuuu", memory: "Everyday fighting for the seat in bus 🥺. Holding hands while sleeping. Maintaining the jumping frequency of bus with my shoulder. Kissing you on your forehead while you are asleep 🥺." },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653591/videos/video2_yiinlc.mov", text: "I love youuuu", memory: "Not caring who is watching or who is besides us 🙃" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653599/videos/video3_i2amsm.mov", text: "I love youuuu", memory: "Those quiet moments together meant everything to me." },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653495/videos/video4_hybpf1.mov", text: "I love youuuu", memory: "Tu sui jaay chasma perine to chasma kadhine muki devannu I miss 🙃 " },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653504/videos/video5_emlns8.mov", text: "I love youuuu", memory: "Do Nainon Ke Pechida Sau Galiyare Inmein Kho Kar Tu Milta Hai Kahan Tujhko Ambar Se Pinjre Zyada Pyare" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653527/videos/video6_cmfde5.mov", text: "I love youuuu", memory: "Tifiin pataine khava aavanu tari jode mess ma hoy ke baar " },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653528/videos/video7_vgl6n7.mov", text: "I love youuuu", memory: "Eating from my tiffin together So we can go out and eat something 🥹." },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653520/videos/video8_kzb1ih.mov", text: "I love youuuu", memory: "Maru ethu jani joinne khavanu pivanu and taru ethu khavdavanu and me natak karu ke na nai khau me" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653527/videos/video9_b0jexs.mov", text: "I love youuuu", memory: "Wait video lai lau farithi kar once again badhi vaat ma video photo video." },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653533/videos/video10_t6alcn.mov", text: "I love youuuu", memory: "Nothing just running in the classes of 324 325 and not even running alot more 🙃" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653543/videos/video11_iwn4l0.mov", text: "I love youuuu", memory: "AA vakhte pan mane khotu lagyu tu so you cried and I ended up with tane mannavvu ne sodhvu lecture bunk karine akhu charusat 2 3 vaar farine " },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653551/videos/video12_ztxwis.mov", text: "I love youuuu", memory: "Navu Navu khava javu tari jode" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653594/videos/video13_qz5par.mov", text: "I love youuuu", memory: "Seeing you eating >>>" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653533/videos/video14_epulys.mov", text: "I love youuuu", memory: "Not letting you study bcz Its the only time I have got with you 🙁." },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653545/videos/video15_ypjoew.mov", text: "I love youuuu", memory: "Freezing when I shoot the video. I try to tickle you . kuchi kuchiku 😂" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653548/videos/video16_v4dmau.mov", text: "I love youuuu", memory: "Sitting next to you. You are literally my home. Even I feel sad to return to my original home 🙃. But near you " },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653541/videos/video17_waafvc.mov", text: "I love youuuu", memory: "Waiting for you outside washroom. Calling ketli vaar haju ketli vaar. chalne khava kemke ekla nai jai sakto hu 🙃. haju bus ma jagya rokvani chhe" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653589/videos/video18_qjszot.mov", text: "I love youuuu", memory: "See where is anything except us? I cannot even think about any one thing else than you at that moment and after seeing this on loop 🙃 . Zooming on mustache is common 😂" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653565/videos/video19_hmlr3c.mov", text: "I love youuuu", memory: "Connecting both airpods on my phone. I deny deliberately just bcz tu ruthi jaay and me manau tane 🙃" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653561/videos/video20_g8t5yc.mov", text: "I love youuuu", memory: "No comments on this 🙃" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653576/videos/video21_b3atwd.mov", text: "I love youuuu", memory: "Photo paade chhe to haww to katti to ruthvu 🥺 📈" },
    { src: "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653555/videos/video22_cjmboe.mov", text: "I love youuuu", memory: "Loving your double chin love when you be a small baby around me. Bhale I act MASCULINE around but It feels alot slot good when you act that childish near me 🙃" }
];

const FeelingsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userNotes, setUserNotes] = useState(Array(videoData.length).fill(""));
  const [fadeIn, setFadeIn] = useState(false);
  const [showMemory, setShowMemory] = useState(Array(videoData.length).fill(false));

  useEffect(() => {
    // Initial fade-in animation
    setTimeout(() => {
      setFadeIn(true);
    }, 300);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          const video = videoRefs.current[index];

          if (entry.isIntersecting) {
            setActiveIndex(index);
            if (video && video.tagName === 'VIDEO' && isPlaying) {
              video.play().catch((err) => console.log('Error playing video:', err));
            }
            entry.target.classList.add('active');
          } else {
            if (video && video.tagName === 'VIDEO') {
              video.pause();
            }
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const currentVideo = videoRefs.current[activeIndex];

    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play().catch(err => console.log('Error playing video:', err));
      }
    }
  };

  const goToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const addHeartEffect = (e) => {
    // Create multiple hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = `${e.clientX - 10 + (Math.random() * 20)}px`;
        heart.style.top = `${e.clientY - 10 + (Math.random() * 20)}px`;
        heart.innerHTML = ['❤️', '💕', '💖', '💗', '💘'][Math.floor(Math.random() * 5)];
        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 100);
    }
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...userNotes];
    newNotes[index] = value;
    setUserNotes(newNotes);
  };

  const toggleMemory = (index) => {
    const newShowMemory = [...showMemory];
    newShowMemory[index] = !newShowMemory[index];
    setShowMemory(newShowMemory);
  };

  // Function to navigate to bargain page
  const goToBargainPage = () => {
    navigate('/bargain');
  };

  return (
    <div className={`feelings-container ${fadeIn ? 'fade-in' : ''}`}>
      <div className="page-title">
        <h1>Our Journey Through Moments</h1>
        <p>Every memory has left its mark on my heart</p>
        <div className="title-hearts">
          <span className="animated-heart">❤️</span>
          <span className="animated-heart delay-1">💖</span>
          <span className="animated-heart delay-2">💝</span>
        </div>
      </div>

      {videoData.map((video, index) => (
        <div
          key={index}
          className={`video-section ${activeIndex === index ? 'active-section' : ''}`}
          ref={el => {
            if (el) {
              sectionRefs.current[index] = el;
              el.dataset.index = index;
            }
          }}
        >
          <div className="video-wrapper">
            <div className="video-card">
              <video
                className={`video-element ${index === 14 ? 'rotate-left' : ''}`}
                playsInline
                loop
                ref={el => {
                  if (el) videoRefs.current[index] = el;
                }}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div 
                className="video-overlay"
                onClick={addHeartEffect}
              ></div>

              <div className="text-overlay">
                <p className="caption-text">{video.text}</p>
                <button 
                  className="heart-button pulse" 
                  onClick={() => toggleMemory(index)}
                >
                  {showMemory[index] ? '💭' : '❤️'}
                </button>
              </div>
            </div>

            <div className={`memory-card ${showMemory[index] ? 'show' : ''}`}>
              <p>{video.memory}</p>
            </div>
          </div>

          {/* <div className="feelings-input">
            <textarea
              className="feeling-box"
              placeholder="Write your thoughts here..."
              value={userNotes[index]}
              onChange={(e) => handleNoteChange(index, e.target.value)}
            ></textarea>
          </div> */}
        </div>
      ))}

      <div className="final-message">
        <h2>To the one who changed everything</h2>
        <p>
          I know it's too late for all of this from your side. But it will never be too late for me.
          The month when I was harsh on you, there is no justification for it, and even if I tried to justify it here, it would trigger you.
          All I can say in my defense is that I had already given up on myself before <strong>us</strong>. My surroundings have always been shitty, and while I might have had a choice, in all my anger and sadness, I couldn't see it.
          
          I know you are not the one to blame, and <strong>I am sorry</strong> for all the pain I caused you. I am sorry for all the times I made you cry. I am sorry for all the times I made you feel alone. I am sorry for all the times I made you feel like you were not enough. I am sorry for all the times I made you feel like you were not loved.
          
          The good can never justify the bad. I will talk about this face to face if you want me to, but I know you don't want to see me again.
          But, but, but... I know the "<em>before us</em>," without maturity, with all the toxicity — <strong>we both know it.</strong>
          But I guess I never felt that 10% in my life — that's why I am craving it. You have seen it in your daily life, and you cannot tolerate that exception part.

          <br /><br />

          <em style={{ display: 'block', textAlign: 'center', fontSize: '1.4rem', color: '#ffb3b3' }}>
            "Maybe they don't forget about you — they just forget to remember you."
          </em>

          <br /><br />

          Every night, I am chasing you in different places in my dreams — like in my school life, college — running all over, almost reaching you, but suddenly I wake up, covered in sweat and screaming.
          <strong>I am not even exaggerating any of it.</strong>
        </p>
        <div className="signature">With love, always</div>
        
        {/* Button to navigate to bargain page */}
        <button 
          className="next-page-button" 
          onClick={goToBargainPage}
        >
          Let's Make a Deal ❤️
        </button>
      </div>

      <div className="controls-container">
        <div className="playback-controls">
          <button className="control-button prev" onClick={() => goToSection(Math.max(0, activeIndex - 1))}>
            &laquo;
          </button>
          <button className="control-button play-pause" onClick={togglePlayPause}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button className="control-button next" onClick={() => goToSection(Math.min(videoData.length - 1, activeIndex + 1))}>
            &raquo;
          </button>
        </div>

        <div className="scroll-indicator">
          {videoData.map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => goToSection(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingsPage;