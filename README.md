# Get next Kiri Ban

'Kiri Ban' is an old Japanese Internet culture  
It means that all numbers except the first one are 0, for example 1000, or all numbers are the same, for example 7777.  

You can use this Actions to get the 'Kiri Ban'


# Usage

See [action.yml](action.yml)

**Basic:**
```yaml
steps:
  - uses: actions/checkout@v3
    
  - uses: amyu/get-next-kiri-ban@v1
    id: kiri
      
  # - run: post to slack, etc...
  - if: steps.kiri.outputs.next != ''
    run: echo "The number remaining until the next 'Kiri Ban' is  ${{ steps.kiri.outputs.next }}"
```

I would recommend running it in `pull_request` or `push` event as I definitely don't want to miss a `kiri Ban`!

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributions

Contributions are welcome!
