export const languages = [
    {
        name: "Arabic",
        common: true,
        iso_639_3: "ara",
        iso_639_1: "ar",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Arabic-Language-Flag.svg/2560px-Arabic-Language-Flag.png",
    },
    {
        name: "Azerbaijani",
        common: false,
        iso_639_3: "aze",
        iso_639_1: "az",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/1200px-Flag_of_Azerbaijan.png",
    },
    {
        name: "Belarusian",
        common: false,
        iso_639_3: "bel",
        iso_639_1: "be",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.svg/800px-Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.png",
    },
    {
        name: "Bosnian",
        common: false,
        iso_639_3: "bos",
        iso_639_1: "bs",
        image: "https://lh6.googleusercontent.com/proxy/xII1bEIvIPIEB0DjGM6DfBS2ytYVYjKoxYVv4gQvMZuvJuLoO_yzqaC0CNKh0OsDIe5elMo9x3lSW8D-abwFwpB_uJFAiLGwVvZZ46FLqeLYLGT39hmQGjBtH9yX97aWgGSP2sn-QVtoqXG2-kgA8U6SMnLQxvbi",
    },

    {
        name: "Bulgarian",
        common: true,
        iso_639_3: "bul",
        iso_639_1: "bg",
        image: "https://i0.wp.com/campingvelikotarnovo.com/wp-content/uploads/2021/08/bulgarian-flag.jpg?fit=1920%2C1080&ssl=1",
    },
    {
        name: "Czech",
        common: true,
        iso_639_3: "ces",
        iso_639_1: "cs",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/800px-Flag_of_the_Czech_Republic.png",
    },
    {
        name: "Danish",
        common: true,
        iso_639_3: "dan",
        iso_639_1: "da",
        image: "https://www.norden.org/sites/default/files/styles/content_size_800/public/images/Dansk%2520flag383594.jpeg?itok=CNnL0vpT",
    },
    {
        name: "German",
        common: true,
        iso_639_3: "deu",
        iso_639_1: "de",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.png",
    },
    {
        name: "Modern Greek",
        common: true,
        iso_639_3: "ell",
        iso_639_1: "el",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/800px-Flag_of_Greece.png",
    },
    {
        name: "English",
        common: true,
        iso_639_3: "eng",
        iso_639_1: "en",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.png",
    },
    {
        name: "Estonian",
        common: true,
        iso_639_3: "est",
        iso_639_1: "et",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/1200px-Flag_of_Estonia.png",
    },
    {
        name: "Finnish",
        common: true,
        iso_639_3: "fin",
        iso_639_1: "fi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1200px-Flag_of_Finland.png",
    },
    {
        name: "French",
        common: true,
        iso_639_3: "fra",
        iso_639_1: "fr",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.png",
    },
    {
        name: "Croatian",
        common: true,
        iso_639_3: "hrv",
        iso_639_1: "hr",
        image: "data:image/png;base64,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",
    },
    {
        name: "Hungarian",
        common: true,
        iso_639_3: "hun",
        iso_639_1: "hu",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Flag_of_Hungary_with_great_coat_of_arms_%281849%29.svg/2560px-Flag_of_Hungary_with_great_coat_of_arms_%281849%29.png",
    },
    {
        name: "Armenian",
        common: true,
        iso_639_3: "hye",
        iso_639_1: "hy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzRjdT_41jJLvvrOkj-C87NrRObnHPUdGOLVFiorhJg&s",
    },
    {
        name: "Italian",
        common: true,
        iso_639_3: "ita",
        iso_639_1: "it",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/2560px-Flag_of_Italy.png",
    },
    {
        name: "Japanese",
        common: true,
        iso_639_3: "jpn",
        iso_639_1: "ja",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1UWFPQpCYfi2V2pgqOCCMNrbL6Bst6gfYH87jjQAerQ&s",
    },
    {
        name: "Georgian",
        common: true,
        iso_639_3: "kat",
        iso_639_1: "ka",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/640px-Flag_of_Georgia.png",
    },
    {
        name: "Korean",
        common: true,
        iso_639_3: "kor",
        iso_639_1: "ko",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_South_Korea.png",
    },
    {
        name: "Latvian",
        common: true,
        iso_639_3: "lav",
        iso_639_1: "lv",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/2560px-Flag_of_Latvia.png",
    },
    {
        name: "Lithuanian",
        common: true,
        iso_639_3: "lit",
        iso_639_1: "lt",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/640px-Flag_of_Lithuania.png",
    },
    {
        name: "Luxembourgish",
        common: false,
        iso_639_3: "ltz",
        iso_639_1: "lb",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/640px-Flag_of_Luxembourg.png",
    },
    {
        name: "Dutch",
        common: true,
        iso_639_3: "nld",
        iso_639_1: "nl",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.png",
    },
    {
        name: "Norwegian",
        common: true,
        iso_639_3: "nor",
        iso_639_1: "no",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Norway.png",
    },
    {
        name: "Polish",
        common: true,
        iso_639_3: "pol",
        iso_639_1: "pl",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.png",
    },
    {
        name: "Portuguese",
        common: true,
        iso_639_3: "por",
        iso_639_1: "pt",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/800px-Flag_of_Portugal.png",
    },
    {
        name: "Romanian",
        common: true,
        iso_639_3: "ron",
        iso_639_1: "ro",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/2560px-Flag_of_Romania.png",
    },
    {
        name: "Slovak",
        common: true,
        iso_639_3: "slk",
        iso_639_1: "sk",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/2560px-Flag_of_Slovakia.png",
    },
    {
        name: "Slovenian",
        common: true,
        iso_639_3: "slv",
        iso_639_1: "sl",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/2560px-Flag_of_Slovenia.png",
    },
    {
        name: "Spanish",
        common: true,
        iso_639_3: "spa",
        iso_639_1: "es",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/800px-Flag_of_Spain.png",
    },
    {
        name: "Albanian",
        common: true,
        iso_639_3: "sqi",
        iso_639_1: "sq",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Albania.png",
    },
    {
        name: "Swedish",
        common: true,
        iso_639_3: "swe",
        iso_639_1: "sv",
        image: "https://cdn.countryflags.com/thumbs/sweden/flag-400.png",
    },
    {
        name: "Turkish",
        common: true,
        iso_639_3: "tur",
        iso_639_1: "tr",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Turkey_flag_300.png",
    },
    {
        name: "Ukrainian",
        common: true,
        iso_639_3: "ukr",
        iso_639_1: "uk",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1200px-Flag_of_Ukraine.png",
    },
    {
        name: "Chinese",
        common: true,
        iso_639_3: "zho",
        iso_639_1: "zh",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.png",
    },
];