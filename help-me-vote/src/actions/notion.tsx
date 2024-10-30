"use server"
import { Client } from "@notionhq/client";

export async function getNotionPageId(url: string): Promise<string | null> {
  const match = url.match(/(?<!=)[0-9a-f]{32}/);
  if (!match) {
    return null;
  }

  const notion = new Client({
    auth: process.env.NOTION_INTEGRATION_TOKEN,
  });

  const response = await notion.blocks.children.list({
    block_id: match[0],
    page_size: 50,
  });

  const contentPromises = response.results.map(async (block) => {
    const blockDetails = await notion.blocks.retrieve({
      block_id: block.id,
    });

    const content = extractTextContent(blockDetails);
    return content;
  });

  const contents = await Promise.all(contentPromises);
  
  const fullText = contents.filter(Boolean).join('\n');
  console.log(fullText);
  return fullText;
}

function extractTextContent(block: any): string {
  const blockType = block.type;
  const content = block[blockType]?.rich_text;
  
  if (!content) return '';
  
  return content
    .map((textBlock: any) => textBlock.plain_text)
    .join(' ');
}