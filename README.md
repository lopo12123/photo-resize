### photo resize

1. with `node` support  
   ```shell
   $ git clone https://github.com/lopo12123/photo-resize.git
   $ cd photo-resize
   $ yarn install
   ```

2. with no runtime dependencies  
[to download page](https://github.com/lopo12123/photo-resize/releases/tag/v0.0.2)

    > default usage

   - Put all the photos in the directory `input`
   - Double click `solve.exe`
   - It will resize all the photo using default config
    
    > custom usage

   - Open a `cmd` or `powershell` window in the same directory of `solve.exe`
   - Enter `solve.exe` with custom args
   - It will resize all the photo using custom config

    > configs
    
    ```yaml
    default:
      width = 50
      height = 50
      inputDir = './input'
      outputDir = './output'
      acceptSuffix = ['.png', '.jpg', '.jpeg']
    
    args:
      width:
        w=<yourWidth>
        width=<yourWidth>
      height:
        h=<yourHeight>
        height=<yourHeight>
      size:
        size=<yourSize>
    ```
    
    > examples
    
    ```shell
    # 1. double click solve.exe directly (will use default config)
    
    # 2. command with custom args
    $ solve.exe w=30 h=40  # output size: 30 * 40
    $ solve.exe width=30 height=40  # output size: 30 * 40
    $ solve.exe size=50  # output size: 50 * 50
    $ solve.exe w=30  # output size: 30 * 50
    $ solve.exe h=20  # output size: 50 * 20
    ```