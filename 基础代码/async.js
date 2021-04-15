function asyncToGenerator(generatorFunc) {
    return function() {
        const gen = generatorFunc.apply(this, arguments);
        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult;
                try {
                    generatorResult = gen[key](arg);
                } catch(e) {
                    return reject(e);
                }

                const {value, done} = generatorResult;

                if(done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value)
                        .then(
                            function onResolve(val) {
                                step('next', val);
                            },
                            function onReject(e) {
                                step('throw', e);
                            }
                        );
                }
            }
            step('next');
        });
    };
}