"use client";

import { motion, Reorder } from "framer-motion";
import { GripVertical, HardDrive, LayoutDashboard, Palette, ShieldCheck, Thermometer } from "lucide-react";
import { useState } from "react";

const drives = [
  { name: "SYSTEM", value: 62, capacity: "1 TB", colour: "#70f5ff", temperature: "42°" },
  { name: "PROJECTS", value: 41, capacity: "2 TB", colour: "#bd77ff", temperature: "39°" },
  { name: "ARCHIVE", value: 78, capacity: "2 TB", colour: "#ffb44c", temperature: "44°" },
];

const cardOptions = ["CPU performance", "Memory pressure", "GPU thermals", "Network activity"];

export default function StorageCustomization() {
  const [cards, setCards] = useState(cardOptions);
  const [accent, setAccent] = useState("cyan");
  const [compact, setCompact] = useState(false);

  return (
    <section className="storage-customization" aria-label="Storage and customization">
      <div className="storage-universe">
        <div className="section-kicker">
          <span>09</span>
          <span>Your drives, without the treasure hunt</span>
        </div>
        <div className="storage-heading">
          <div>
            <p className="eyebrow">Which drive is getting full?</p>
            <h2>
              Capacity is only half
              <br />
              <span>the useful answer.</span>
            </h2>
          </div>
          <p>
            See space, speed, temperature, and health together. That way “62% used” does not hide
            a hot drive or a sudden drop in throughput.
          </p>
        </div>
        <div className="drive-orbits">
          {drives.map((drive, index) => (
            <motion.div
              className="drive-planet"
              key={drive.name}
              style={
                {
                  "--drive-colour": drive.colour,
                  "--drive-progress": `${drive.value * 3.6}deg`,
                } as React.CSSProperties
              }
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <div className="drive-orbit-ring" aria-hidden="true">
                <i style={{ animationDelay: `${index * -1.4}s` }} />
              </div>
              <div className="drive-disc">
                <div>
                  <HardDrive size={18} />
                  <strong>{drive.value}%</strong>
                  <small>USED</small>
                </div>
              </div>
              <div className="drive-planet-label">
                <span>{drive.name}</span>
                <strong>{drive.capacity}</strong>
              </div>
              <div className="drive-planet-meta">
                <span>
                  <Thermometer size={13} /> {drive.temperature}
                </span>
                <span>
                  <ShieldCheck size={13} /> Healthy
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={`customization-lab accent-${accent} ${compact ? "is-compact" : ""}`}>
        <div className="customization-copy">
          <div className="section-kicker">
            <span>10</span>
            <span>Put your priorities first</span>
          </div>
          <p className="eyebrow">You know what you care about</p>
          <h2>
            Put the useful cards first.
            <br />
            <span>Move the rest out of the way.</span>
          </h2>
          <p>
            Drag the cards into your order, pick an accent, or tighten the layout when you want
            more information on screen. Try it here—the preview is live.
          </p>

          <div className="lab-controls">
            <div>
              <small>Accent environment</small>
              <div className="lab-swatches">
                {[
                  ["cyan", "#70f5ff"],
                  ["violet", "#bd77ff"],
                  ["amber", "#ffb44c"],
                  ["green", "#7cf5b2"],
                ].map(([name, colour]) => (
                  <button
                    type="button"
                    key={name}
                    className={accent === name ? "active" : ""}
                    style={{ "--swatch": colour } as React.CSSProperties}
                    onClick={() => setAccent(name)}
                    aria-label={`Use ${name} accent`}
                  />
                ))}
              </div>
            </div>
            <label>
              <span>
                <strong>Compact layout</strong>
                <small>Increase information density</small>
              </span>
              <input
                type="checkbox"
                checked={compact}
                onChange={(event) => setCompact(event.target.checked)}
              />
              <i />
            </label>
          </div>
        </div>

        <div className="customization-preview">
          <div className="preview-toolbar">
            <span>
              <LayoutDashboard size={15} /> Edit dashboard
            </span>
            <small>Drag to reorder</small>
          </div>
          <Reorder.Group axis="y" values={cards} onReorder={setCards} className="reorder-stack">
            {cards.map((card, index) => (
              <Reorder.Item value={card} key={card} className="reorder-card">
                <GripVertical size={16} />
                <span>
                  <i>{index + 1}</i>
                  <strong>{card}</strong>
                  <small>{index === 0 ? "Primary card · Full width" : "Secondary card"}</small>
                </span>
                <div className="mini-card-graph">
                  {Array.from({ length: 8 }, (_, bar) => (
                    <i key={bar} style={{ height: `${24 + ((bar * 29 + index * 17) % 70)}%` }} />
                  ))}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <div className="preview-callout">
            <Palette size={15} />
            <span>Changes preview instantly and stay local to your dashboard.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
