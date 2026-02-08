export function Footer() {
    return (
        <footer className="bg-card text-card-foreground border-t border-border p-4">
            <p className="text-center text-sm">&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </footer>
    );
}