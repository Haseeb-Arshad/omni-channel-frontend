"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Bold, Italic, Code, Heading1, Heading2, List, 
  ListOrdered, Link, Image, Quote, Undo, Redo
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarkdownEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export function MarkdownEditor({ 
  initialValue = "", 
  onChange, 
  placeholder = "Write your content here... (Supports Markdown formatting)",
  minHeight = 400
}: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(e.target.value);
  };

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      setSelectionStart(textareaRef.current.selectionStart);
      setSelectionEnd(textareaRef.current.selectionEnd);
    }
  };

  const insertText = (before: string, after: string = "") => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      
      const newValue = 
        textarea.value.substring(0, start) + 
        before + 
        selectedText + 
        after + 
        textarea.value.substring(end);
      
      updateValue(newValue);
      
      // Set selection after the operation
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length + after.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const insertMarkdown = (type: string) => {
    switch (type) {
      case "bold":
        insertText("**", "**");
        break;
      case "italic":
        insertText("*", "*");
        break;
      case "code":
        insertText("`", "`");
        break;
      case "codeblock":
        insertText("```\n", "\n```");
        break;
      case "h1":
        insertText("# ");
        break;
      case "h2":
        insertText("## ");
        break;
      case "h3":
        insertText("### ");
        break;
      case "ul":
        insertText("- ");
        break;
      case "ol":
        insertText("1. ");
        break;
      case "blockquote":
        insertText("> ");
        break;
      case "link":
        insertText("[", "](url)");
        break;
      case "image":
        insertText("![alt text](", ")");
        break;
      case "hr":
        insertText("\n---\n");
        break;
      default:
        break;
    }
  };

  return (
    <div className="markdown-editor">
      <div className="p-2 border-b bg-muted/30 flex flex-wrap gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Bold"
          onClick={() => insertMarkdown("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Italic"
          onClick={() => insertMarkdown("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Code"
          onClick={() => insertMarkdown("code")}
        >
          <Code className="h-4 w-4" />
        </Button>
        <span className="h-8 w-px bg-border mx-1"></span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Heading 1"
          onClick={() => insertMarkdown("h1")}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Heading 2"
          onClick={() => insertMarkdown("h2")}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <span className="h-8 w-px bg-border mx-1"></span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Bulleted List"
          onClick={() => insertMarkdown("ul")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Numbered List"
          onClick={() => insertMarkdown("ol")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Blockquote"
          onClick={() => insertMarkdown("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <span className="h-8 w-px bg-border mx-1"></span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Link"
          onClick={() => insertMarkdown("link")}
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Image"
          onClick={() => insertMarkdown("image")}
        >
          <Image className="h-4 w-4" />
        </Button>
        <span className="h-8 w-px bg-border mx-1"></span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Code Block"
          onClick={() => insertMarkdown("codeblock")}
        >
          <div className="font-mono text-xs">{"{ }"}</div>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          title="Horizontal Rule"
          onClick={() => insertMarkdown("hr")}
        >
          <div className="font-mono text-xs">---</div>
        </Button>
      </div>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextChange}
        onSelect={handleSelectionChange}
        placeholder={placeholder}
        className="w-full p-4 resize-none focus:outline-none text-sm"
        style={{ minHeight: `${minHeight}px` }}
      />
      
      <div className="text-xs text-muted-foreground p-2 border-t bg-muted/10">
        <div className="flex justify-between">
          <span>Markdown supported</span>
          <span>{value.length} characters</span>
        </div>
      </div>
    </div>
  );
}
