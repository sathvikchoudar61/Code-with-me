import express from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/compiler
router.post('/', async (req, res) => {
  const { code, input } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided.' });

  // Create a unique temp directory for this run
  const tempDir = path.join(process.cwd(), 'temp', uuidv4());
  fs.mkdirSync(tempDir, { recursive: true });
  const javaFile = path.join(tempDir, 'Main.java');
  const inputFile = path.join(tempDir, 'input.txt');

  try {
    // Write code and input to files
    fs.writeFileSync(javaFile, code);
    if (input) fs.writeFileSync(inputFile, input);

    // Compile Java code
    exec(`javac Main.java`, { cwd: tempDir, timeout: 8000 }, (compileErr, stdout, stderr) => {
      if (compileErr) {
        cleanup();
        return res.json({ output: stderr || compileErr.message, error: true });
      }
      // Run Java code
      const runCmd = input ? `java Main < input.txt` : `java Main`;
      exec(runCmd, { cwd: tempDir, timeout: 8000 }, (runErr, runStdout, runStderr) => {
        cleanup();
        if (runErr) {
          return res.json({ output: runStderr || runErr.message, error: true });
        }
        res.json({ output: runStdout, error: false });
      });
    });
  } catch (e) {
    cleanup();
    res.status(500).json({ output: e.message, error: true });
  }

  // Cleanup temp files
  function cleanup() {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  }
});

export default router; 