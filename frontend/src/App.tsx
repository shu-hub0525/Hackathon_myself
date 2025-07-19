import React, { useState, useRef, useEffect } from "react";
import { Send, ArrowLeftRight, Globe } from "lucide-react";

// ▼▼▼ 型定義を追加 ▼▼▼

// 扱う方言の型
const dialects = [
  "北海道弁",
  "東北弁（津軽弁）",
  "関西弁",
  "広島弁",
  "博多弁",
  "沖縄弁",
] as const;
type Dialect = (typeof dialects)[number];

// 翻訳方向の型
type TranslationDirection = "standard-to-dialect" | "dialect-to-standard";

// メッセージオブジェクトの型
interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  dialect?: Dialect; // botのメッセージにのみ存在
  direction?: TranslationDirection; // botのメッセージにのみ存在
}

// ▲▲▲ 型定義ここまで ▲▲▲

const DialectTranslator: React.FC = () => {
  // ▼▼▼ Stateに型を適用 ▼▼▼
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [selectedDialect, setSelectedDialect] = useState<Dialect>("関西弁");
  const [translationDirection, setTranslationDirection] =
    useState<TranslationDirection>("standard-to-dialect");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // ▲▲▲ Stateの型適用ここまで ▲▲▲

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // モックの翻訳API（実際のハッカソンではバックエンドAPIに接続）
  const mockTranslate = async (
    text: string,
    dialect: Dialect,
    direction: TranslationDirection
  ): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 型安全のため、より厳密な定義も可能だが、ここでは簡略化
    const examples: any = {
      関西弁: {
        "standard-to-dialect": {
          こんにちは: "こんにちわ〜",
          ありがとう: "おおきに",
          すみません: "すんまへん",
          そうですね: "せやな",
          元気です: "元気やで",
        },
        "dialect-to-standard": {
          おおきに: "ありがとう",
          せやな: "そうですね",
          あかん: "だめ",
          しんどい: "疲れた",
          ほんま: "本当",
        },
      },
      博多弁: {
        "standard-to-dialect": {
          こんにちは: "こんちゃ",
          ありがとう: "ありがとうございます",
          すみません: "すんません",
          そうですね: "そうですね〜",
          元気です: "元気ばい",
        },
      },
      沖縄弁: {
        "standard-to-dialect": {
          こんにちは: "はいさい",
          ありがとう: "にふぇーでーびる",
          すみません: "ごめんなさい",
          そうですね: "うん、そうさー",
          元気です: "元気さー",
        },
      },
    };

    const dialectExamples = examples[dialect]?.[direction] || {};
    const exactMatch = dialectExamples[text];

    if (exactMatch) {
      return exactMatch;
    }

    if (direction === "standard-to-dialect") {
      switch (dialect) {
        case "関西弁":
          return text.replace(/です/g, "や").replace(/ます/g, "まっせ") + "〜";
        case "博多弁":
          return text + "ばい";
        case "沖縄弁":
          return text + "さー";
        default:
          return text + `（${dialect}風）`;
      }
    } else {
      return text.replace(/〜/g, "").replace(/ばい/g, "").replace(/さー/g, "");
    }
  };

  const handleTranslate = async (): Promise<void> => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTranslating(true);

    try {
      const translatedText = await mockTranslate(
        inputText,
        selectedDialect,
        translationDirection
      );

      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: translatedText,
        dialect: selectedDialect,
        direction: translationDirection,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Translation error:", error);
      // ここでエラーメッセージをUIに表示する処理も追加できる
    } finally {
      setIsTranslating(false);
    }
  };

  // ▼▼▼ イベントハンドラに型を適用 ▼▼▼
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleDialectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedDialect(e.target.value as Dialect);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };
  // ▲▲▲ イベントハンドラの型適用ここまで ▲▲▲

  const toggleDirection = (): void => {
    setTranslationDirection((prev) =>
      prev === "standard-to-dialect"
        ? "dialect-to-standard"
        : "standard-to-dialect"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-sans">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              方言トランスレーター
            </h1>
          </div>
          <p className="text-gray-300 text-lg">日本全国の方言を楽しく学ぼう</p>
        </div>

        {/* 翻訳設定パネル */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <select
                value={selectedDialect}
                onChange={handleDialectChange} // 修正
                className="bg-white/20 backdrop-blur-sm text-white rounded-lg px-4 py-2 border border-white/30 focus:border-cyan-400 focus:outline-none"
              >
                {dialects.map((dialect) => (
                  <option key={dialect} value={dialect} className="bg-gray-800">
                    {dialect}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleDirection}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {translationDirection === "standard-to-dialect"
                ? "標準語→方言"
                : "方言→標準語"}
            </button>
          </div>
        </div>

        {/* チャットエリア */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-6">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  メッセージを入力して方言翻訳を始めましょう！
                </p>
                <p className="text-sm mt-2">
                  例: 「こんにちは」「ありがとう」など
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.content}</p>
                    {message.type === "bot" && (
                      <div className="mt-2 text-xs opacity-70">
                        {message.dialect} •{" "}
                        {message.direction === "standard-to-dialect"
                          ? "標準語→方言"
                          : "方言→標準語"}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isTranslating && (
              <div className="flex justify-start">
                <div className="bg-white/20 backdrop-blur-sm text-white border border-white/30 max-w-xs md:max-w-md px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm">翻訳中...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 入力エリア */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange} // 修正
              onKeyPress={handleKeyPress}
              placeholder="翻訳したいテキストを入力してください..."
              className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-xl px-4 py-3 border border-white/30 focus:border-cyan-400 focus:outline-none"
              disabled={isTranslating}
            />
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>日本の方言文化を楽しく学び、保存していきましょう 🗾</p>
        </div>
      </div>
    </div>
  );
};

export default DialectTranslator;
