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
    
  - name: Setup JDK 11
    uses: amyu/get-next-kiri-ban@v1
    id: kiri
      
  # - run: post to slack, etc...
  - run: echo "The number remaining until the next 'Kiri Ban' is  ${{ steps.kiri.outputs.next }}"
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributions

Contributions are welcome!
