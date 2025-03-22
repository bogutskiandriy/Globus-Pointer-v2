import { Router } from "express";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const router = Router();
const postsDirectory = path.join(process.cwd(), "backend", "src", "content");

const window = new JSDOM("").window;
const purify = DOMPurify(window);

// Функція для отримання всіх постів
router.get("/posts", (_, res) => {
    try {
        const files = fs.readdirSync(postsDirectory);
        const posts = files
            .filter(file => file.endsWith(".md")) // Беремо тільки .md файли
            .map(file => {
                const filePath = path.join(postsDirectory, file);
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const { data, content } = matter(fileContent); // Отримуємо metadata та вміст
                return {
                    title: data['title'] || "Без назви",
                    date: data['date'] || "Без дати",
                    slug: file.replace(".md", ""), // Унікальний ідентифікатор поста
                    content: purify.sanitize(marked(content, { async: false })) // Sanitized HTML
                };
            });

        res.status(200).json(posts); // Додано статус 200
    } catch (error) {
        console.error("Error reading posts:", error); // Логування помилки
        res.status(500).json({ error: "Помилка при зчитуванні постів" });
    }
});

// Функція для отримання одного поста за slug (назвою файлу)
router.get("/posts/:slug", (req, res) => {
    try {
        const { slug } = req.params;
        const filePath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Пост не знайдено" });
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        res.status(200).json({ // Додано статус 200
            title: data['title'] || "Без назви",
            date: data['date'] || "Без дати",
            content: purify.sanitize(marked(content, { async: false })) // Sanitized HTML
        });
    } catch (error) {
        console.error("Error reading post:", error); // Логування помилки
        res.status(500).json({ error: "Помилка при зчитуванні поста" });
    }
});

export default router;
