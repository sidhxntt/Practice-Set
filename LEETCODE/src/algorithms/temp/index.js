#!/usr/bin/env node

import * as p from '@clack/prompts';
import { existsSync } from 'fs';
import { extname, basename, join, dirname } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supported formats
const SUPPORTED_FORMATS = {
  input: ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp', '.gif', '.svg'],
  output: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'bmp', 'gif', 'avif']
};

async function main() {
  console.clear();
  
  p.intro(`🖼️  Image Converter CLI`);

  const options = await p.group(
    {
      inputPath: () =>
        p.text({
          message: 'Enter the input image path:',
          placeholder: './input.jpg',
          validate: (value) => {
            if (!value) return 'Please enter a file path';
            
            try {
              if (!existsSync(value)) {
                return 'File does not exist';
              }
              
              const ext = extname(value).toLowerCase();
              if (!SUPPORTED_FORMATS.input.includes(ext)) {
                return `Unsupported input format. Supported: ${SUPPORTED_FORMATS.input.join(', ')}`;
              }
            } catch (error) {
              return 'Error checking file';
            }
          }
        }),

      outputFormat: () =>
        p.select({
          message: 'Select output format:',
          options: SUPPORTED_FORMATS.output.map(format => ({
            value: format,
            label: format.toUpperCase()
          }))
        }),

      quality: ({ results }) =>
        ['jpg', 'jpeg', 'webp'].includes(results.outputFormat) 
          ? p.text({
              message: 'Quality (1-100, default: 80):',
              placeholder: '80',
              validate: (value) => {
                if (!value) return undefined; // Allow empty for default
                const num = parseInt(value);
                if (isNaN(num) || num < 1 || num > 100) {
                  return 'Quality must be a number between 1 and 100';
                }
              }
            })
          : undefined,

      resize: () =>
        p.confirm({
          message: 'Resize image?',
          initialValue: false
        }),

      width: ({ results }) =>
        results.resize 
          ? p.text({
              message: 'Width (pixels, leave empty to maintain aspect ratio):',
              placeholder: '1920',
              validate: (value) => {
                if (!value) return undefined;
                const num = parseInt(value);
                if (isNaN(num) || num < 1) {
                  return 'Width must be a positive number';
                }
              }
            })
          : undefined,

      height: ({ results }) =>
        results.resize 
          ? p.text({
              message: 'Height (pixels, leave empty to maintain aspect ratio):',
              placeholder: '1080',
              validate: (value) => {
                if (!value) return undefined;
                const num = parseInt(value);
                if (isNaN(num) || num < 1) {
                  return 'Height must be a positive number';
                }
              }
            })
          : undefined,

      outputPath: ({ results }) =>
        p.text({
          message: 'Output path (leave empty for auto-generated):',
          placeholder: `${basename(results.inputPath, extname(results.inputPath))}.${results.outputFormat}`,
          validate: (value) => {
            // Allow empty for auto-generated path
            return undefined;
          }
        })
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      }
    }
  );

  // Generate output path if not provided
  if (!options.outputPath) {
    const inputBasename = basename(options.inputPath, extname(options.inputPath));
    const inputDir = dirname(options.inputPath);
    options.outputPath = join(inputDir, `${inputBasename}.${options.outputFormat}`);
  }

  const spinner = p.spinner();
  spinner.start('Converting image...');

  try {
    // Initialize Sharp with input image
    let image = sharp(options.inputPath);

    // Get image metadata for info
    const metadata = await image.metadata();
    
    // Apply resize if requested
    if (options.resize) {
      const width = options.width ? parseInt(options.width) : undefined;
      const height = options.height ? parseInt(options.height) : undefined;
      
      if (width || height) {
        image = image.resize(width, height, {
          withoutEnlargement: true,
          fit: sharp.fit.inside
        });
      }
    }

    // Apply format-specific options
    switch (options.outputFormat) {
      case 'jpg':
      case 'jpeg':
        const jpegQuality = options.quality ? parseInt(options.quality) : 80;
        image = image.jpeg({ quality: jpegQuality });
        break;
      case 'png':
        image = image.png();
        break;
      case 'webp':
        const webpQuality = options.quality ? parseInt(options.quality) : 80;
        image = image.webp({ quality: webpQuality });
        break;
      case 'tiff':
        image = image.tiff();
        break;
      case 'bmp':
        image = image.bmp();
        break;
      case 'gif':
        image = image.gif();
        break;
      case 'avif':
        image = image.avif();
        break;
    }

    // Convert and save
    await image.toFile(options.outputPath);

    // Get output file stats
    const outputMetadata = await sharp(options.outputPath).metadata();

    spinner.stop('✅ Image converted successfully!');

    // Show conversion summary
    p.note(
      `Input:  ${metadata.width}x${metadata.height} ${metadata.format?.toUpperCase()} (${(metadata.size / 1024).toFixed(1)} KB)
Output: ${outputMetadata.width}x${outputMetadata.height} ${options.outputFormat.toUpperCase()} (${(outputMetadata.size / 1024).toFixed(1)} KB)
Saved:  ${options.outputPath}`,
      'Conversion Summary'
    );

  } catch (error) {
    spinner.stop('❌ Conversion failed');
    p.log.error(`Error: ${error.message}`);
    process.exit(1);
  }

  p.outro('Thanks for using Image Converter! 🎉');
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});