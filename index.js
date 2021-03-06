const share = source => {
  let sinks = [];
  let sourceTalkback;
  return function shared(start, sink) {
    if (start !== 0) return;
    sinks.push(sink);
    if (sinks.length === 1) {
      source(0, (t, d) => {
        if (t === 0) sourceTalkback = d;
        else for (let s of sinks.slice(0)) s(t, d);
        if (t === 2) sinks = [];
      });
    }
    sink(0, (t, d) => {
      if (t === 0) return;
      if (t === 2) {
        const i = sinks.indexOf(sink);
        if (i > -1) sinks.splice(i, 1);
        if (!sinks.length) sourceTalkback(2);
      } else {
        sourceTalkback(t, d);
      }
    });
  }
}

module.exports = share;
