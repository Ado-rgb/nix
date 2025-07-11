console.log('🕒 Starting Maleficent . . .');
const { join } = require('path');
const { spawn } = require('child_process');
const start = () => {
    const p = spawn(process.argv[0], [join(__dirname, 'main.js'), ...process.argv.slice(2)], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        })
        .on('message', data => {
            if (data === 'reset') {
                console.log('🕒 Restarting Maleficent . . .');
                p.kill()
            }
            if (data === 'uptime') {
                p.send(process.uptime())
            }
        })
        .on('exit', code => {
            console.log('Exited with code:', code);
            start()
        });        
};
start()