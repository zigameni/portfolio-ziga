const Footer = () => {
    return (
        <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            {/* Links to Terms & Conditions and Privacy Policy */}
            <div className="text-white-500 flex gap-2">
                <a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a>
                <p>|</p>
                <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3">
                <a href="https://github.com/zigameni" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
                </a>
                <a href="https://linkedin.com/in/gazmend-shehu" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src="/assets/linkedin-3.svg" alt="linkedin" className="w-1/2 h-1/2" />
                </a>
                <a href="https://instagram.com/zigameni" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2" />
                </a>
            </div>

            {/* Copyright Notice */}
            <p className="text-white-500">© 2024 Gazmend Shehu. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
