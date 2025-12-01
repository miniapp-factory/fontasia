"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const riddles = [
  {
    level: 1,
    riddle: "Thin as a whisper, old as a tale,\nI hold inked secrets that time can pale.",
    answer: ["parchment"],
    hint: "You’d find me in an old library or ancient scroll — I’m not paper, but close.",
    font: "Parchment",
  },
  {
    level: 2,
    riddle: "I look like letters caught mid-vibration,\na wavy echo from a retro station.",
    answer: ["stereofidelic", "stereo"],
    hint: "Think of something that vibrates, like sound coming from two speakers at once.",
    font: "Stereofidelic",
  },
  {
    level: 3,
    riddle: "I grace your bank, your card, your note,\nmy clean lines make your money quote.",
    answer: ["kredit"],
    hint: "I deal with Kash in your wallets, deals with coins and card",
    font: "KREDIT",
  },
  {
    level: 4,
    riddle: "💌➡️👀📱\n😃💬❤️\n🐱🎉🌎",
    answer: ["emoji"],
    hint: "I use pictures, not letters, to say what words cannot.",
    font: "Emoji",
  },
  {
    level: 5,
    riddle: "🔩😀🥄🍄🅰💲🕴🅰",
    answer: ["fontasia"],
    hint: "I am what you previously saw, a name is what you clearly see. Look through the past and see me clearly",
    font: "Fontasia",
  },
];

const randomRiddles = [
  // 20+ simple riddles for random mode
  { riddle: "What has keys but can't open locks?", answer: ["piano"], hint: "It's a musical instrument." },
  { riddle: "What has hands but can't clap?", answer: ["clock"], hint: "It tells time." },
  { riddle: "What has a heart that doesn't beat?", answer: ["artichoke"], hint: "It's a vegetable." },
  { riddle: "What can travel around the world while staying in a corner?", answer: ["stamp"], hint: "Used on mail." },
  { riddle: "What has a neck but no head?", answer: ["bottle"], hint: "Contains liquids." },
  { riddle: "What gets wetter the more it dries?", answer: ["towel"], hint: "Used after a shower." },
  { riddle: "What has a bed but never sleeps?", answer: ["river"], hint: "Flows through land." },
  { riddle: "What has a head and a tail but no body?", answer: ["coin"], hint: "Used for money." },
  { riddle: "What has a tongue but cannot taste?", answer: ["shoe"], hint: "Worn on feet." },
  { riddle: "What has a face and two hands but no arms?", answer: ["clock"], hint: "Tells time." },
  { riddle: "What has a ring but no finger?", answer: ["phone"], hint: "Used to call." },
  { riddle: "What has a bed but never sleeps?", answer: ["river"], hint: "Flows through land." },
  { riddle: "What has a heart that doesn't beat?", answer: ["artichoke"], hint: "It's a vegetable." },
  { riddle: "What has a head and a tail but no body?", answer: ["coin"], hint: "Used for money." },
  { riddle: "What has a neck but no head?", answer: ["bottle"], hint: "Contains liquids." },
  { riddle: "What gets wetter the more it dries?", answer: ["towel"], hint: "Used after a shower." },
  { riddle: "What can be cracked, made, told, and played?", answer: ["joke"], hint: "Humorous." },
  { riddle: "What has a mouth but never eats?", answer: ["river"], hint: "Flows through land." },
  { riddle: "What has a head but no body?", answer: ["coin"], hint: "Used for money." },
];

export default function Game() {
  const [mode, setMode] = useState<"menu" | "level" | "random" | "won">("menu");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);

  const currentRiddle = mode === "random"
    ? randomRiddles[randomIndex]
    : riddles.find((r) => r.level === currentLevel);

  const handleStart = () => {
    setMode("level");
    setCurrentLevel(1);
    setInput("");
    setMessage("");
    setShowHint(false);
  };

  const handleRandom = () => {
    const idx = Math.floor(Math.random() * randomRiddles.length);
    setRandomIndex(idx);
    setMode("random");
    setInput("");
    setMessage("");
    setShowHint(false);
  };

  const handleExit = () => {
    setMode("menu");
    setInput("");
    setMessage("");
    setShowHint(false);
  };

  const handleEnter = () => {
    if (!currentRiddle) return;
    const trimmed = input.trim().toLowerCase();
    const correct = currentRiddle.answer.some((ans) => ans.toLowerCase() === trimmed);
    if (correct) {
      setMessage("Correct!");
      setFeedbackMessage("Correct!");
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
      if (mode === "level") {
        if (currentLevel < riddles.length) {
          setCurrentLevel(currentLevel + 1);
          setInput("");
          setShowHint(false);
        } else {
          setMessage("You completed all levels! 🎉");
          setMode("menu");
        }
      } else {
        setMessage("Correct! Back to menu.");
        setMode("menu");
      }
    } else {
      setMessage("Incorrect, try again.");
    }
  };

  const handleBack = () => {
    setMode("menu");
    setInput("");
    setMessage("");
    setShowHint(false);
  };

  const handleHint = () => {
    setShowHint(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {mode === "menu" && (
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center">
            <img src="/logo.png" alt="Fontasia logo" className="size-32 mb-4" />
            <CardTitle className="text-2xl">Fontasia</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button onClick={handleStart} className="w-full">
              Start Level
            </Button>
            <Button onClick={handleRandom} variant="outline" className="w-full">
              Random
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleExit}>
              Exit
            </Button>
          </CardContent>
        </Card>
      )}

      {(mode === "level" || mode === "random") && currentRiddle && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">
              {mode === "level" ? `Level ${currentLevel}` : "Random Riddle"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="font-mono">{currentRiddle.riddle}</p>
            {showHint && (
              <p className="text-muted-foreground italic">{currentRiddle.hint}</p>
            )}
            <Input
              placeholder="Your answer"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full"
            />
            <div className="flex gap-2">
              <Button onClick={handleHint} variant="outline" className="flex-1">
                Hint
              </Button>
              <Button onClick={handleEnter} className="flex-1">
                Enter
              </Button>
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
            </div>
            {message && <p className="mt-2">{message}</p>}
            <Feedback message={feedbackMessage} visible={showFeedback} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
