"use client";
import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => { setParagraphs(3); setWordsPerPara(50); }}>Load Demo</Button></div>
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

const words = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"];

function randWord(): string { return words[Math.floor(Math.random() * words.length)]; }
function genSentence(min: number, max: number): string {
  const len = min + Math.floor(Math.random() * (max - min));
  const s = Array.from({ length: len }, randWord);
  s[0] = s[0][0].toUpperCase() + s[0].slice(1);
  return s.join(" ") + ".";
}
function genParagraph(wc: number): string {
  const sentences: string[] = [];
  let rem = wc;
  while (rem > 0) { const sLen = Math.min(rem, 8 + Math.floor(Math.random() * 12)); sentences.push(genSentence(Math.max(3, sLen - 3), sLen)); rem -= sLen; }
  return sentences.join(" ");
}

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerPara, setWordsPerPara] = useState(50);
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    setOutput(Array.from({ length: paragraphs }, () => genParagraph(wordsPerPara)).join("\n\n"));
  }, [paragraphs, wordsPerPara]);

  return (
    <div>
      <ToolPageHeader name="Lorem Ipsum Generator" description="Generate placeholder text with paragraph/word counts" icon="FileText" slug="lorem-ipsum" category="text" copyText={output} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => { setParagraphs(3); setWordsPerPara(50); }}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1"><Label>Paragraphs</Label><Input type="number" min={1} max={20} value={paragraphs} onChange={(e) => setParagraphs(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))} className="w-20 h-8 text-sm" /></div>
          <div className="space-y-1"><Label>Words/para</Label><Input type="number" min={10} max={200} value={wordsPerPara} onChange={(e) => setWordsPerPara(Math.min(200, Math.max(10, parseInt(e.target.value) || 10)))} className="w-20 h-8 text-sm" /></div>
          <div className="flex items-end"><Button onClick={generate} size="sm"><FileText className="h-4 w-4" /> Generate</Button></div>
        </div>
        {output && <Textarea value={output} readOnly className="min-h-[300px] text-sm" />}
        {output && <div className="text-xs text-muted-foreground">{output.split(" ").length} words, {output.split("\n\n").length} paragraphs</div>}
      </div>
    </div>
  );
}
