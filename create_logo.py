import os
from PIL import Image, ImageDraw, ImageFont

def create_logo():
    size = (256, 256)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Try finding a thick font
    font_paths = [
        "/System/Library/Fonts/Supplemental/Arial Black.ttf",
        "/System/Library/Fonts/Supplemental/Impact.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf"
    ]
    font = None
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font = ImageFont.truetype(fp, 100)
                break
            except Exception:
                pass
    
    if font is None:
        font = ImageFont.load_default()

    text = "ІПЗ"
    
    # Calculate text layout
    try:
        bbox = font.getbbox(text)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
    except Exception:
        # Fallback for older PIL
        w, h = d.textsize(text, font=font)
        
    x = (256 - w) / 2
    y = (256 - h) / 2 - 20 # shift slightly up the baseline

    # Draw the back of the golden orbital ring
    d.arc([10, 40, 246, 216], start=150, end=330, fill="#FFCC00", width=20)
    
    # Text shadow/3D effect
    d.text((x+8, y+8), text, font=font, fill="#000080")
    
    # Main text
    d.text((x, y), text, font=font, fill="#0033CC")
    
    # Draw the front of the golden orbital ring
    d.arc([10, 40, 246, 216], start=330, end=150, fill="#FFCC00", width=20)
    
    # Fallback if start/end args don't wrap correctly in older PIL: 
    # PIL arc 330 to 150 means wrap around. 
    # To be safe:
    d.arc([10, 40, 246, 216], start=330, end=360, fill="#FFCC00", width=20)
    d.arc([10, 40, 246, 216], start=0, end=150, fill="#FFCC00", width=20)

    # Make target directories
    os.makedirs("apps/frontend/public/images", exist_ok=True)
    img.save("apps/frontend/public/images/logo.png")
    img.save("apps/frontend/app/icon.png")

if __name__ == "__main__":
    create_logo()
