export class LanguageDefaults {
    private _language: string;
    private _defaults: Record<string, any>;

    constructor(language: string) {
        this._language = language;
        this._defaults = {
            javascript: { color: 'shiki-bg', label: '.js', lineNumbers: true },
            python: { color: 'shiki-bg', label: '.py', lineNumbers: true },
            text: { color: 'shiki-bg-text', label: 'text', lineNumbers: false },
            console: { color: 'shiki-bg-console', label: 'cmd', lineNumbers: false },
            default: { color: 'shiki-bg', label: '', lineNumbers: false },
        };
    }

    // Getter for retrieving the current language defaults
    private get defaults() {
        return this._defaults[this._language] || this._defaults.default;
    }

    // Property to access the color for the current language
    get color(): string {
        return this.defaults.color;
    }

    // Property to access the label for the current language
    get label(): string {
        return this.defaults.label;
    }

    // Property to access whether line numbers should be shown
    get lineNumbers(): boolean {
        return Boolean(this.defaults.lineNumbers);
    }
} 
