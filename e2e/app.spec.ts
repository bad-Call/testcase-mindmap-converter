import { test, expect } from "@playwright/test";

test("should convert markdown to json and back", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const markdownInput = `###### Test Case
- Priority: P1
- Precondition:
  - Precondition 1
  - Precondition 2
- Steps:
  | Action | Expect |
  | --- | --- |
  | Action 1 | Expect 1 |
  | Action 2 | Expect 2 |`;

  await page.fill('textarea[placeholder="Enter Markdown here"]', markdownInput);
  await page.click('button:has-text("MD -> JSON")');

  const jsonOutput = await page.inputValue(
    'textarea[placeholder="JSON output here"]'
  );
  const parsedJson = JSON.parse(jsonOutput);

  expect(parsedJson).toEqual([
    {
      data: {
        text: "Test Case",
        stepTag: 1,
        priority: 2,
      },
      children: [
        {
          data: {
            text: "Precondition 1",
            stepTag: 2,
          },
          children: [],
        },
        {
          data: {
            text: "Precondition 2",
            stepTag: 2,
          },
          children: [],
        },
        {
          data: {
            text: "Action 1",
            stepTag: 3,
          },
          children: [
            {
              data: {
                text: "Expect 1",
                stepTag: 4,
              },
              children: [],
            },
          ],
        },
        {
          data: {
            text: "Action 2",
            stepTag: 3,
          },
          children: [
            {
              data: {
                text: "Expect 2",
                stepTag: 4,
              },
              children: [],
            },
          ],
        },
      ],
    },
  ]);

  await page.click('button:has-text("JSON -> MD")');
  const newMarkdownInput = await page.inputValue(
    'textarea[placeholder="Enter Markdown here"]'
  );
  expect(newMarkdownInput).toBe(markdownInput);
});
