import React, { useState, useEffect, useRef } from 'react';
import { X, Ear, Info, Loader2, Video, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface SignLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOADING_MESSAGES = [
  "Initializing AI Video Engine... / جاري تهيئة محرك الذكاء الاصطناعي...",
  "Generating sign language gestures... / جاري إنشاء حركات لغة الإشارة...",
  "Rendering high-quality frames... / جاري معالجة إطارات الفيديو...",
  "This usually takes a few minutes... / قد يستغرق هذا بضع دقائق...",
  "Ensuring clear and accurate signs... / التأكد من وضوح ودقة الإشارات...",
  "Almost ready... / على وشك الانتهاء..."
];

export const SignLanguageModal: React.FC<SignLanguageModalProps> = ({ isOpen, onClose }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen || videoUrl || isGenerating) return;

    const generateVideo = async () => {
      setIsGenerating(true);
      setIsFallback(false);
      setErrorMessage(null);
      let messageIndex = 0;

      const messageInterval = setInterval(() => {
        if (isMountedRef.current) {
          messageIndex++;
          setLoadingMessage(LOADING_MESSAGES[messageIndex % LOADING_MESSAGES.length]);
        }
      }, 4000);

      try {
        // The API key must be provided by the environment (process.env.API_KEY).
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
        
        let operation = await ai.models.generateVideos({
          model: 'veo-2.0-generate-001',
          prompt: 'A professional sign language interpreter in a studio setting, wearing a formal navy blue suit, looking directly at the camera, explaining how to use a mobile app with clear and precise hand gestures, well-lit, medium shot, highly detailed.',
          config: {
            numberOfVideos: 1
          }
        });

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          if (!isMountedRef.current) break;
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        if (isMountedRef.current && operation.response?.generatedVideos?.[0]?.video?.uri) {
          const downloadLink = operation.response.generatedVideos[0].video.uri;
          const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
          if (!response.ok) throw new Error(`Failed to fetch video bytes: ${response.statusText}`);
          
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
        } else if (isMountedRef.current) {
          throw new Error("Generation failed or returned empty response from Veo 2.0.");
        }
      } catch (err: any) {
        console.error("Video generation error:", err);
        if (isMountedRef.current) {
          setIsFallback(true);
          // Capture the exact error message to show the user why it failed (e.g., Invalid API Key)
          setErrorMessage(err?.message || String(err) || "Unknown error occurred");
          // Fallback to a standard instructional video if AI generation fails
          setVideoUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");
        }
      } finally {
        if (isMountedRef.current) {
          setIsGenerating(false);
          clearInterval(messageInterval);
        }
      }
    };

    generateVideo();
  }, [isOpen, videoUrl, isGenerating]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gov-navyDark/90 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gov-navy text-white p-4 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Ear size={20} className="text-gov-tealLight" />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base">AI Sign Language Guide</h3>
              <p className="text-[10px] md:text-xs text-gray-300">دليل الاستخدام بلغة الإشارة (مدعوم بالذكاء الاصطناعي)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-gray-50 flex flex-col items-center overflow-y-auto max-h-[70vh]">
          
          {/* Video Player / Loading State */}
          <div className="w-full max-w-2xl bg-black rounded-xl overflow-hidden shadow-lg relative aspect-video border border-gray-200 flex items-center justify-center">
            
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-gov-teal rounded-full animate-ping opacity-20"></div>
                  <Video size={48} className="text-gov-teal animate-pulse relative z-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">Generating AI Video</h4>
                  <p className="text-sm text-gray-400 max-w-md mx-auto animate-pulse">
                    {loadingMessage}
                  </p>
                </div>
                <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gov-teal w-1/2 animate-[pulse_2s_ease-in-out_infinite] rounded-full" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            )}

            {videoUrl && !isGenerating && (
              <>
                {isFallback && (
                  <div className="absolute top-0 left-0 w-full bg-gray-900/95 text-white text-xs md:text-sm p-3 text-center z-20 backdrop-blur-md flex flex-col items-center justify-center border-b border-gray-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle size={18} className="text-gov-red flex-shrink-0" />
                      <span className="font-medium">
                        AI Video Generation Failed. Displaying standard instructional guide.
                      </span>
                    </div>
                    <div className="bg-black/50 rounded px-3 py-1.5 font-mono text-xs text-red-400 max-w-xl truncate">
                      Reason: {errorMessage}
                    </div>
                  </div>
                )}
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </>
            )}
          </div>
          
          {/* Video Description */}
          <div className="mt-6 w-full max-w-2xl bg-white p-5 rounded-xl border border-gray-200 flex flex-col md:flex-row items-start md:space-x-4 shadow-sm gap-4 md:gap-0">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600 flex-shrink-0">
              <Info size={24} />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gov-navy text-lg mb-2">How to use Arqami / كيفية استخدام أرقامي</h4>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  This guide explains how to check your registered numbers, authorize new SIM cards, and instantly report any unrecognized numbers using the Zero-Trust Shield.
                </p>
                <div className="w-full h-px bg-gray-100"></div>
                <p className="text-gray-600 text-sm leading-relaxed font-medium" dir="rtl">
                  يشرح هذا الدليل كيفية التحقق من أرقامك المسجلة، تفويض شرائح جديدة، والإبلاغ الفوري عن أي أرقام غير معروفة باستخدام درع الحماية الاستباقي.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-4 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close / إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
