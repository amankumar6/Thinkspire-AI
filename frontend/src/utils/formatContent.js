export const formatContent = (text) => {
    const replacements = [
        { regex: /\*\*(.*?)\*\*/g, replaceWith: "<strong>$1</strong>" }, // Bold
        { regex: /_(.*?)_/g, replaceWith: "<em>$1</em>" }, // Italics
        { regex: /~(.*?)~/g, replaceWith: "<del>$1</del>" }, // Strikethrough
        {
            regex: /```(.*?)```/g,
            replaceWith: '<code class="bg-gray-200 rounded p-1">$1</code>',
        }, // Monospace
        { regex: /^\* (.*?)(?=\n|$)/gm, replaceWith: "<li>$1</li>" }, // Bulleted list
        { regex: /^- (.*?)(?=\n|$)/gm, replaceWith: "<li>$1</li>" }, // Bulleted list
        { regex: /^\d+\. (.*?)(?=\n|$)/gm, replaceWith: "<li>$1</li>" }, // Numbered list
        {
            regex: /^> (.*?)(?=\n|$)/gm,
            replaceWith: "<blockquote>$1</blockquote>",
        }, // Quote
        { regex: /`(.*?)`/g, replaceWith: "<code>$1</code>" }, // Inline code
        { regex: /\n/g, replaceWith: "<br />" }, // Newline
    ];

    return replacements.reduce(
        (acc, { regex, replaceWith }) => acc.replace(regex, replaceWith),
        text
    );
};
