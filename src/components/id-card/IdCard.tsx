import { useState } from "react";
import { profileData } from "@/data/profile-data";
import "./id-card.css";

// Decorative barcode bars — widths alternate to mimic a real barcode
const BARCODE_BARS = [2,1,3,1,2,2,1,3,1,1,2,3,1,2,1,3,2,1,2,1,3,1,2,2,1,3,2,1];

const IdCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  const handleCardClick = () => {
    if (isTouchDevice) setIsFlipped((p) => !p);
  };

  return (
    <div className="id-card-wrapper relative" onClick={handleCardClick} aria-label="ID Card — tap to flip">
      <div className={`id-card-inner${isFlipped ? " is-flipped" : ""}`}>

        {/* ════════════════════════════════
            FRONT FACE
        ════════════════════════════════ */}
        <div className="id-card-face id-card-front">
          {/* Header */}
          <div className="card-header">
            <span className="card-header-label">Dev · ID</span>
            <div className="card-header-chip" aria-hidden="true" />
          </div>

          {/* Photo / Avatar */}
          <div className="card-photo-area">
            <div className="card-photo-bg" aria-hidden="true" />
            <div className="card-avatar" aria-label="Avatar">YDK</div>
          </div>

          {/* Name block */}
          <div className="card-name-block">
            <div className="card-name">{profileData.name}</div>
            <div className="card-title">{profileData.title}</div>
          </div>

          {/* Bottom bar */}
          <div className="card-bottom-bar">
            <div className="card-bottom-avatar" aria-hidden="true">Y</div>
            <div className="card-bottom-info">
              <span className="card-handle">{profileData.handle}</span>
              <span className="card-status-text">{profileData.status}</span>
            </div>
            <a
              href="#contact"
              className="card-cta-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Wanna Talk?
            </a>
          </div>
        </div>

        {/* ════════════════════════════════
            BACK FACE
        ════════════════════════════════ */}
        <div className="id-card-face id-card-back">
          <div className="back-label">Developer Profile</div>

          <div className="back-stats">
            {/* CP Rating */}
            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">🏆</span>
              <div className="back-stat-content">
                <span className="back-stat-label">CP Rating</span>
                <span className="back-stat-value">{profileData.stats.cpRating}</span>
                <span className="back-stat-sub">[{profileData.stats.platform}]</span>
              </div>
            </div>

            {/* Problems Solved */}
            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">🎯</span>
              <div className="back-stat-content">
                <span className="back-stat-label">Problems Solved</span>
                <span className="back-stat-value">{profileData.stats.problemsSolved.toLocaleString()}</span>
              </div>
            </div>

            {/* Projects */}
            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">📁</span>
              <div className="back-stat-content">
                <span className="back-stat-label">Projects</span>
                <span className="back-stat-value">{profileData.stats.projects} shipped</span>
              </div>
            </div>

            {/* College */}
            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">🎓</span>
              <div className="back-stat-content">
                <span className="back-stat-label">College</span>
                <span className="back-stat-value" style={{ fontSize: "13px" }}>
                  {profileData.college}
                </span>
              </div>
            </div>
          </div>

          <div className="back-divider" />

          {/* Status */}
          <div className="back-status-line">
            <span className="back-status-dot" aria-hidden="true" />
            STATUS: ACTIVE
          </div>

          {/* Resume link */}
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="back-resume-link"
            onClick={(e) => e.stopPropagation()}
          >
            open resume
          </a>

          {/* Decorative barcode */}
          <div className="back-barcode" aria-hidden="true">
            <div className="back-barcode-bars">
              {BARCODE_BARS.map((w, i) => (
                <div
                  key={i}
                  className="back-barcode-bar"
                  style={{
                    width: `${w}px`,
                    height: `${14 + (i % 3) * 6}px`,
                  }}
                />
              ))}
            </div>
            <span className="back-barcode-text">YDK · 2024</span>
          </div>
        </div>
      </div>

      {/* Flip hint — only visible on non-touch */}
      {!isTouchDevice && (
        <span className="card-flip-hint" aria-hidden="true">hover to flip ↗</span>
      )}
    </div>
  );
};

export default IdCard;