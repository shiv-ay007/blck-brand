import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StorySection() {
  return (
    <section className="story-section">
      <div className="story-section__image">
        <img
          src="/assets/model-closeup.webp"
          alt="BLCK model in black streetwear wearing green graphic socks"
          loading="lazy"
        />
        <div className="story-image-stamp">
          BUILT<br />
          DIFFERENT<span>®</span>
        </div>
      </div>
      <div className="story-section__text">
        <div>
          <span className="eyebrow">02 / THE IDEA</span>
          <h2>
            BE<br />
            UNLIKE<br />
            <em>THE REST.</em>
          </h2>
        </div>
        <div>
          <p>
            BLCK isn't about following the room. It's about walking in with your own energy.
            Loud in the details. Quiet in the confidence.
          </p>
          <Link to="/about" className="arrow-link">
            DISCOVER OUR STORY <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
