import readline from "node:readline";

const question = (
  rl: readline.Interface,
  { text, value }: Record<"text" | "value", string | number>
) => {
  const q = `${text}(${value})\n`;
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
};

export const interact = async (
  questions: Record<"text" | "value", string | number>[]
) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q);
    answers.push(answer);
  }
  rl.close();
  return answers;
};
