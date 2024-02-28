
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

export async function processLatexString(latexString) {
  try {
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex, {throwOnError: false, errorColor: '#cc0000'})
      .use(rehypeStringify)
      .process(latexString);

    return String(processedContent);
  } catch (error) {
    console.error('Error processing LaTeX string:', error);
    return null;
  }
}