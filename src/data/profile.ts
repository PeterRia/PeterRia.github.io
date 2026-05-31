export type Language = "zh" | "en";

type Localized<T> = Record<Language, T>;

export const defaultLanguage: Language = "zh";

export const profile: Localized<{
  name: string;
  role: string;
  summary: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  resumeLabel: string;
  blogLabel: string;
}> = {
  zh: {
    name: "PeterRia",
    role: "个人简历与技术博客",
    summary:
      "面向真实交付的个人主页：以简历为核心，呈现项目、能力、文章与自动化内容发布流程。",
    location: "China / Remote",
    availability: "开放合作",
    email: "413628805@qq.com",
    github: "https://github.com/PeterRia",
    resumeLabel: "查看简历",
    blogLabel: "阅读文章"
  },
  en: {
    name: "PeterRia",
    role: "Resume-first personal site",
    summary:
      "A delivery-oriented personal homepage focused on resume, projects, skills, writing, and automated publishing from Word documents.",
    location: "China / Remote",
    availability: "Open to collaboration",
    email: "413628805@qq.com",
    github: "https://github.com/PeterRia",
    resumeLabel: "View Resume",
    blogLabel: "Read Writing"
  }
};

export const metrics: Localized<Array<{ value: string; label: string }>> = {
  zh: [
    { value: "2", label: "语言版本" },
    { value: "1", label: "自动发布流水线" },
    { value: "100%", label: "静态部署" }
  ],
  en: [
    { value: "2", label: "Languages" },
    { value: "1", label: "Publishing pipeline" },
    { value: "100%", label: "Static delivery" }
  ]
};

export const focusAreas: Localized<
  Array<{ title: string; description: string; accent: "teal" | "copper" | "violet" }>
> = {
  zh: [
    {
      title: "简历叙事",
      description: "把经历、项目、技能与可验证成果组织成清晰的职业叙事。",
      accent: "teal"
    },
    {
      title: "内容自动化",
      description: "支持从 Word 图文文档导入简历与博客文章，降低后续维护成本。",
      accent: "copper"
    },
    {
      title: "静态发布",
      description: "通过 GitHub Actions 构建并发布到 GitHub Pages，适合长期托管。",
      accent: "violet"
    }
  ],
  en: [
    {
      title: "Resume Narrative",
      description:
        "Shape experience, projects, skills, and outcomes into a coherent career story.",
      accent: "teal"
    },
    {
      title: "Content Automation",
      description:
        "Import resume and blog content from Word documents with embedded images.",
      accent: "copper"
    },
    {
      title: "Static Publishing",
      description:
        "Build and deploy through GitHub Actions to GitHub Pages for durable hosting.",
      accent: "violet"
    }
  ]
};

export const timeline: Localized<
  Array<{ period: string; title: string; place: string; details: string[] }>
> = {
  zh: [
    {
      period: "2026",
      title: "双语简历博客系统",
      place: "GitHub Pages",
      details: [
        "搭建简历优先的信息架构，兼顾博客、项目与联系方式。",
        "实现 Word 图文导入流程，让内容更新可以从文档开始。",
        "配置 Actions 自动构建和发布，减少手工部署步骤。"
      ]
    },
    {
      period: "Current",
      title: "独立开发与自动化工作流",
      place: "Remote",
      details: [
        "关注个人知识管理、静态站点、内容发布和 AI 辅助工程流程。",
        "优先选择简单、可验证、可长期维护的技术方案。"
      ]
    }
  ],
  en: [
    {
      period: "2026",
      title: "Bilingual resume blog system",
      place: "GitHub Pages",
      details: [
        "Designed a resume-first information architecture with writing, projects, and contact paths.",
        "Built a Word import pipeline so content updates can begin in familiar documents.",
        "Configured Actions-based build and deployment to reduce manual publishing work."
      ]
    },
    {
      period: "Current",
      title: "Independent development and automation workflows",
      place: "Remote",
      details: [
        "Focused on personal knowledge systems, static sites, content publishing, and AI-assisted engineering.",
        "Prefer simple, verifiable, and maintainable technical choices."
      ]
    }
  ]
};

export const skills: Localized<
  Array<{ group: string; items: Array<{ name: string; level: number }> }>
> = {
  zh: [
    {
      group: "工程交付",
      items: [
        { name: "静态站点", level: 92 },
        { name: "自动化脚本", level: 88 },
        { name: "GitHub Actions", level: 84 }
      ]
    },
    {
      group: "内容系统",
      items: [
        { name: "双语结构", level: 90 },
        { name: "Markdown/MDX", level: 88 },
        { name: "图文导入", level: 82 }
      ]
    }
  ],
  en: [
    {
      group: "Engineering Delivery",
      items: [
        { name: "Static Sites", level: 92 },
        { name: "Automation Scripts", level: 88 },
        { name: "GitHub Actions", level: 84 }
      ]
    },
    {
      group: "Content Systems",
      items: [
        { name: "Bilingual Structure", level: 90 },
        { name: "Markdown/MDX", level: 88 },
        { name: "Rich Document Import", level: 82 }
      ]
    }
  ]
};

export const navItems: Localized<Array<{ label: string; href: string }>> = {
  zh: [
    { label: "首页", href: "/" },
    { label: "简历", href: "/resume/zh/" },
    { label: "博客", href: "/blog/" }
  ],
  en: [
    { label: "Home", href: "/" },
    { label: "Resume", href: "/resume/en/" },
    { label: "Blog", href: "/blog/" }
  ]
};
