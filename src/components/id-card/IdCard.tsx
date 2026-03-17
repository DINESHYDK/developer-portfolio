import { useState } from "react";
import { profileData } from "@/data/profile-data";
import "./id-card.css";
import profilePhoto from "@/public/images/profile.jpg";

const BARCODE_BARS = [2,1,3,1,2,2,1,3,1,1,2,3,1,2,1,3,2,1,2,1,3,1,2,2,1,3,2,1];

const PHOTO_SRC = profilePhoto;

const IdCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  const handleCardClick = () => {
    if (isTouchDevice) setIsFlipped((p) => !p);
  };

  return (
    <div
      className="id-card-wrapper"
      onClick={handleCardClick}
      aria-label="ID Card — hover/tap to flip"
    >
      <div className={`id-card-inner${isFlipped ? " is-flipped" : ""}`}>

        {/* ════════════════════
            FRONT FACE
        ════════════════════ */}
        <div className="id-card-face id-card-front">
          {/* Header */}
          <div className="card-header">
            <span className="card-header-label">Dev · ID</span>
            <div className="card-header-chip" aria-hidden="true" />
          </div>

          {/* Photo / Fallback Avatar */}
          <div className="card-photo-area">
            {!photoError ? (
              <img
                src={PHOTO_SRC}
                alt={profileData.name}
                className="card-photo"
                onError={() => setPhotoError(true)}
                draggable={false}
              />
            ) : (
              <div className="card-avatar-fallback" aria-label="Avatar">
                YDK
              </div>
            )}
            <div className="card-photo-overlay" aria-hidden="true" />
            <div className="card-photo-tint" aria-hidden="true" />
          </div>

          {/* Name block (overlaps faded photo) */}
          <div className="card-name-block">
            <div className="card-name">{profileData.name}</div>
            <div className="card-title">{profileData.title}</div>
          </div>

          {/* Bottom bar */}
          <div className="card-bottom-bar">
            <div className="card-bottom-avatar" aria-hidden="true">
              {!photoError ? (
                <img src={PHOTO_SRC} alt="profile" draggable={false} />
              ) : (
                "Y"
              )}
            </div>
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

        {/* ════════════════════
            BACK FACE
        ════════════════════ */}
        <div className="id-card-face id-card-back">
          {/* Header row */}
          <div className="back-header">
            <span className="back-label">Developer Profile</span>
            <div className="back-header-logo" aria-hidden="true" />
          </div>

          <div className="back-divider" />

          {/* Stats */}
          <div className="back-stats">
            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">🏆</span>
              <div>
                <span className="back-stat-label">CP Rating</span>
                <span className="back-stat-value">
                  {profileData.stats.cpRating}
                  <span className="back-stat-sub">[{profileData.stats.platform}]</span>
                </span>
              </div>
            </div>

            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">🎯</span>
              <div>
                <span className="back-stat-label">Problems Solved</span>
                <span className="back-stat-value">
                  {profileData.stats.problemsSolved.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">📁</span>
              <div>
                <span className="back-stat-label">Projects Shipped</span>
                <span className="back-stat-value">{profileData.stats.projects}</span>
              </div>
            </div>

            <div className="back-stat-row">
              <span className="back-stat-icon" aria-hidden="true">🎓</span>
              <div>
                <span className="back-stat-label">College</span>
                <span className="back-stat-college">{profileData.college}</span>
              </div>
            </div>
          </div>

          <div className="back-divider" />

          {/* Status + Resume */}
          <div className="back-bottom">
            <div className="back-status-line">
              <span className="back-status-dot" aria-hidden="true" />
              STATUS: ACTIVE
            </div>
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="back-resume-link"
              onClick={(e) => e.stopPropagation()}
            >
              open resume
            </a>
          </div>

          {/* Decorative barcode */}
          <div className="back-barcode" aria-hidden="true">
            <div className="back-barcode-bars">
              {BARCODE_BARS.map((w, i) => (
                <div
                  key={i}
                  className="back-barcode-bar"
                  style={{
                    width: `${w}px`,
                    height: `${12 + (i % 3) * 5}px`,
                  }}
                />
              ))}
            </div>
            <span className="back-barcode-text">YDK · 2024</span>
          </div>
        </div>
      </div>

      {/* Flip hint — desktop only */}
      {!isTouchDevice && (
        <span className="card-flip-hint" aria-hidden="true">
          hover to flip ↗
        </span>
      )}
    </div>
  );
};

export default IdCard;