inFile=$1
outFile=$2

pandoc -t html5 --template=template/index.html --mathml --standalone --section-divs --no-highlight --variable theme="sky" --variable transition="cube" source/"$inFile".md -o output/"$outFile".html
