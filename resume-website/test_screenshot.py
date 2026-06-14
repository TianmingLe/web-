from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('http://localhost:5173/energy')
    page.wait_for_load_state('networkidle')
    time.sleep(2)

    # Scroll to pipeline section
    page.evaluate("""
        const section = document.querySelector('canvas');
        if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
    """)
    time.sleep(3)

    page.screenshot(path='/workspace/resume-website/screenshot_pipeline.png', full_page=False)
    print("Screenshot saved to /workspace/resume-website/screenshot_pipeline.png")
    browser.close()
