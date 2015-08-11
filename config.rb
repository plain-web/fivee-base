http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "img"
javascripts_dir = "js"
output_style = :expanded #圧縮して書き出し　:nested　:expanded　:compact　:compressed
line_comments = false #ラインごとに書き出されるコメントを出力しない
relative_assets = true #スプライト時に相対パスになる
Encoding.default_external = 'utf-8'

#for img sprite
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end