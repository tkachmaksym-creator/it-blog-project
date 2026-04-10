import os
from PIL import Image, ImageDraw, ImageFont

def generate_logo():
    size = 256
    cx, cy, r = 128, 128, 85

    back_ring = Image.new('RGBA', (size, size), (0,0,0,0))
    globe = Image.new('RGBA', (size, size), (0,0,0,0))
    front_ring = Image.new('RGBA', (size, size), (0,0,0,0))

    g_draw = ImageDraw.Draw(globe)
    for radius in range(r, 0, -1):
        shift = 30 * (1 - radius/r)
        ox = cx - shift
        oy = cy - shift
        
        ratio = radius / r
        color = (
            int(20 - 20 * ratio),
            int(100 - 100 * ratio),
            int(255 - 80 * ratio),
            255
        )
        g_draw.ellipse((ox - radius, oy - radius, ox + radius, oy + radius), fill=color)

    ring_canvas = Image.new('RGBA', (size, size), (0,0,0,0))
    r_draw = ImageDraw.Draw(ring_canvas)
    
    r_draw.arc((10, 60, 246, 196), start=0, end=360, fill="#FFCC00", width=22)
    r_draw.arc((15, 65, 241, 191), start=0, end=360, fill="#E6A800", width=8)
    
    ring_canvas = ring_canvas.rotate(25, resample=Image.BICUBIC)

    pixels = ring_canvas.load()
    b_pixels = back_ring.load()
    f_pixels = front_ring.load()

    for y in range(size):
        for x in range(size):
            p = pixels[x, y]
            if p[3] > 0:
                if x + y < size + 30: 
                    b_pixels[x, y] = p
                else:
                    f_pixels[x, y] = p

    text_canvas = Image.new('RGBA', (size, size), (0,0,0,0))
    t_draw = ImageDraw.Draw(text_canvas)

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
                font = ImageFont.truetype(fp, 90)
                break
            except:
                pass

    if font is None:
        font = ImageFont.load_default()

    text = "ІПЗ"
    try:
        bbox = font.getbbox(text)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
    except:
        w, h = t_draw.textsize(text, font=font)

    tx = (size - w) / 2
    ty = (size - h) / 2 - 40 # Shifted further UP

    # Draw black outline to improve readability
    outline_color = (0, 0, 50, 255)
    t_draw.text((tx-3, ty-3), text, font=font, fill=outline_color)
    t_draw.text((tx+3, ty-3), text, font=font, fill=outline_color)
    t_draw.text((tx-3, ty+3), text, font=font, fill=outline_color)
    t_draw.text((tx+3, ty+3), text, font=font, fill=outline_color)

    # Shadow
    t_draw.text((tx+7, ty+7), text, font=font, fill=(0, 0, 70, 255))
    
    # Main White Text
    t_draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))

    final = Image.alpha_composite(back_ring, globe)
    final = Image.alpha_composite(final, text_canvas)
    final = Image.alpha_composite(final, front_ring)

    # Less extreme downscaling to preserve legibility of the text
    small = final.resize((80, 80), Image.NEAREST)
    final_pixelated = small.resize((256, 256), Image.NEAREST)

    os.makedirs("apps/frontend/public/images", exist_ok=True)
    final_pixelated.save("apps/frontend/public/images/logo.png")
    final_pixelated.save("apps/frontend/app/icon.png")

if __name__ == "__main__":
    generate_logo()
