(self.webpackChunkcusto_engage_frontend =
  self.webpackChunkcusto_engage_frontend || []).push([
  [179],
  {
    255: (Ko) => {
      function Bn(Yo) {
        return Promise.resolve().then(() => {
          var En = new Error("Cannot find module '" + Yo + "'");
          throw ((En.code = "MODULE_NOT_FOUND"), En);
        });
      }
      (Bn.keys = () => []), (Bn.resolve = Bn), (Bn.id = 255), (Ko.exports = Bn);
    },
    10: (Ko, Bn, Yo) => {
      "use strict";
      function En(t) {
        return "function" == typeof t;
      }
      let Rl = !1;
      const Ht = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            Rl &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          Rl = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return Rl;
        },
      };
      function Lr(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const yi = {
          closed: !0,
          next(t) {},
          error(t) {
            if (Ht.useDeprecatedSynchronousErrorHandling) throw t;
            Lr(t);
          },
          complete() {},
        },
        qf = Array.isArray || ((t) => t && "number" == typeof t.length);
      function Wf(t) {
        return null !== t && "object" == typeof t;
      }
      const bi = (() => {
        function t(e) {
          return (
            Error.call(this),
            (this.message = e
              ? `${e.length} errors occurred during unsubscription:\n${e
                  .map((n, r) => `${r + 1}) ${n.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = e),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class De {
        constructor(e) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
        }
        unsubscribe() {
          let e;
          if (this.closed) return;
          let {
            _parentOrParents: n,
            _ctorUnsubscribe: r,
            _unsubscribe: o,
            _subscriptions: s,
          } = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            n instanceof De)
          )
            n.remove(this);
          else if (null !== n)
            for (let i = 0; i < n.length; ++i) n[i].remove(this);
          if (En(o)) {
            r && (this._unsubscribe = void 0);
            try {
              o.call(this);
            } catch (i) {
              e = i instanceof bi ? zf(i.errors) : [i];
            }
          }
          if (qf(s)) {
            let i = -1,
              a = s.length;
            for (; ++i < a; ) {
              const l = s[i];
              if (Wf(l))
                try {
                  l.unsubscribe();
                } catch (d) {
                  (e = e || []),
                    d instanceof bi ? (e = e.concat(zf(d.errors))) : e.push(d);
                }
            }
          }
          if (e) throw new bi(e);
        }
        add(e) {
          let n = e;
          if (!e) return De.EMPTY;
          switch (typeof e) {
            case "function":
              n = new De(e);
            case "object":
              if (n === this || n.closed || "function" != typeof n.unsubscribe)
                return n;
              if (this.closed) return n.unsubscribe(), n;
              if (!(n instanceof De)) {
                const s = n;
                (n = new De()), (n._subscriptions = [s]);
              }
              break;
            default:
              throw new Error(
                "unrecognized teardown " + e + " added to Subscription."
              );
          }
          let { _parentOrParents: r } = n;
          if (null === r) n._parentOrParents = this;
          else if (r instanceof De) {
            if (r === this) return n;
            n._parentOrParents = [r, this];
          } else {
            if (-1 !== r.indexOf(this)) return n;
            r.push(this);
          }
          const o = this._subscriptions;
          return null === o ? (this._subscriptions = [n]) : o.push(n), n;
        }
        remove(e) {
          const n = this._subscriptions;
          if (n) {
            const r = n.indexOf(e);
            -1 !== r && n.splice(r, 1);
          }
        }
      }
      var t;
      function zf(t) {
        return t.reduce((e, n) => e.concat(n instanceof bi ? n.errors : n), []);
      }
      De.EMPTY = (((t = new De()).closed = !0), t);
      const vi =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class ye extends De {
        constructor(e, n, r) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = yi;
              break;
            case 1:
              if (!e) {
                this.destination = yi;
                break;
              }
              if ("object" == typeof e) {
                e instanceof ye
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new Gf(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new Gf(this, e, n, r));
          }
        }
        [vi]() {
          return this;
        }
        static create(e, n, r) {
          const o = new ye(e, n, r);
          return (o.syncErrorThrowable = !1), o;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: e } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = e),
            this
          );
        }
      }
      class Gf extends ye {
        constructor(e, n, r, o) {
          super(), (this._parentSubscriber = e);
          let s,
            i = this;
          En(n)
            ? (s = n)
            : n &&
              ((s = n.next),
              (r = n.error),
              (o = n.complete),
              n !== yi &&
                ((i = Object.create(n)),
                En(i.unsubscribe) && this.add(i.unsubscribe.bind(i)),
                (i.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = i),
            (this._next = s),
            (this._error = r),
            (this._complete = o);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: n } = this;
            Ht.useDeprecatedSynchronousErrorHandling && n.syncErrorThrowable
              ? this.__tryOrSetError(n, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: n } = this,
              { useDeprecatedSynchronousErrorHandling: r } = Ht;
            if (this._error)
              r && n.syncErrorThrowable
                ? (this.__tryOrSetError(n, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (n.syncErrorThrowable)
              r ? ((n.syncErrorValue = e), (n.syncErrorThrown = !0)) : Lr(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), r)) throw e;
              Lr(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const n = () => this._complete.call(this._context);
              Ht.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, n), this.unsubscribe())
                : (this.__tryOrUnsub(n), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, n) {
          try {
            e.call(this._context, n);
          } catch (r) {
            if ((this.unsubscribe(), Ht.useDeprecatedSynchronousErrorHandling))
              throw r;
            Lr(r);
          }
        }
        __tryOrSetError(e, n, r) {
          if (!Ht.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            n.call(this._context, r);
          } catch (o) {
            return Ht.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = o), (e.syncErrorThrown = !0), !0)
              : (Lr(o), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const Zo =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Ci(t) {
        return t;
      }
      let me = (() => {
        class t {
          constructor(n) {
            (this._isScalar = !1), n && (this._subscribe = n);
          }
          lift(n) {
            const r = new t();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const { operator: s } = this,
              i = (function (t, e, n) {
                if (t) {
                  if (t instanceof ye) return t;
                  if (t[vi]) return t[vi]();
                }
                return t || e || n ? new ye(t, e, n) : new ye(yi);
              })(n, r, o);
            if (
              (i.add(
                s
                  ? s.call(i, this.source)
                  : this.source ||
                    (Ht.useDeprecatedSynchronousErrorHandling &&
                      !i.syncErrorThrowable)
                  ? this._subscribe(i)
                  : this._trySubscribe(i)
              ),
              Ht.useDeprecatedSynchronousErrorHandling &&
                i.syncErrorThrowable &&
                ((i.syncErrorThrowable = !1), i.syncErrorThrown))
            )
              throw i.syncErrorValue;
            return i;
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              Ht.useDeprecatedSynchronousErrorHandling &&
                ((n.syncErrorThrown = !0), (n.syncErrorValue = r)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof ye ? n : null;
                  }
                  return !0;
                })(n)
                  ? n.error(r)
                  : console.warn(r);
            }
          }
          forEach(n, r) {
            return new (r = Jf(r))((o, s) => {
              let i;
              i = this.subscribe(
                (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    s(l), i && i.unsubscribe();
                  }
                },
                s,
                o
              );
            });
          }
          _subscribe(n) {
            const { source: r } = this;
            return r && r.subscribe(n);
          }
          [Zo]() {
            return this;
          }
          pipe(...n) {
            return 0 === n.length
              ? this
              : (function (t) {
                  return 0 === t.length
                    ? Ci
                    : 1 === t.length
                    ? t[0]
                    : function (n) {
                        return t.reduce((r, o) => o(r), n);
                      };
                })(n)(this);
          }
          toPromise(n) {
            return new (n = Jf(n))((r, o) => {
              let s;
              this.subscribe(
                (i) => (s = i),
                (i) => o(i),
                () => r(s)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function Jf(t) {
        if ((t || (t = Ht.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const Vr = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class Vv extends De {
        constructor(e, n) {
          super(),
            (this.subject = e),
            (this.subscriber = n),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            n = e.observers;
          if (
            ((this.subject = null),
            !n || 0 === n.length || e.isStopped || e.closed)
          )
            return;
          const r = n.indexOf(this.subscriber);
          -1 !== r && n.splice(r, 1);
        }
      }
      class Kf extends ye {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let xn = (() => {
        class t extends me {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [vi]() {
            return new Kf(this);
          }
          lift(n) {
            const r = new Yf(this, this);
            return (r.operator = n), r;
          }
          next(n) {
            if (this.closed) throw new Vr();
            if (!this.isStopped) {
              const { observers: r } = this,
                o = r.length,
                s = r.slice();
              for (let i = 0; i < o; i++) s[i].next(n);
            }
          }
          error(n) {
            if (this.closed) throw new Vr();
            (this.hasError = !0), (this.thrownError = n), (this.isStopped = !0);
            const { observers: r } = this,
              o = r.length,
              s = r.slice();
            for (let i = 0; i < o; i++) s[i].error(n);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new Vr();
            this.isStopped = !0;
            const { observers: n } = this,
              r = n.length,
              o = n.slice();
            for (let s = 0; s < r; s++) o[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(n) {
            if (this.closed) throw new Vr();
            return super._trySubscribe(n);
          }
          _subscribe(n) {
            if (this.closed) throw new Vr();
            return this.hasError
              ? (n.error(this.thrownError), De.EMPTY)
              : this.isStopped
              ? (n.complete(), De.EMPTY)
              : (this.observers.push(n), new Vv(this, n));
          }
          asObservable() {
            const n = new me();
            return (n.source = this), n;
          }
        }
        return (t.create = (e, n) => new Yf(e, n)), t;
      })();
      class Yf extends xn {
        constructor(e, n) {
          super(), (this.destination = e), (this.source = n);
        }
        next(e) {
          const { destination: n } = this;
          n && n.next && n.next(e);
        }
        error(e) {
          const { destination: n } = this;
          n && n.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: n } = this;
          return n ? this.source.subscribe(e) : De.EMPTY;
        }
      }
      function wi(t) {
        return t && "function" == typeof t.schedule;
      }
      function P(t, e) {
        return function (r) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return r.lift(new jv(t, e));
        };
      }
      class jv {
        constructor(e, n) {
          (this.project = e), (this.thisArg = n);
        }
        call(e, n) {
          return n.subscribe(new Uv(e, this.project, this.thisArg));
        }
      }
      class Uv extends ye {
        constructor(e, n, r) {
          super(e),
            (this.project = n),
            (this.count = 0),
            (this.thisArg = r || this);
        }
        _next(e) {
          let n;
          try {
            n = this.project.call(this.thisArg, e, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(n);
        }
      }
      const Zf = (t) => (e) => {
          for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
          e.complete();
        },
        Di =
          "function" == typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : "@@iterator",
        Xf = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function ep(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const Ml = (t) => {
        if (t && "function" == typeof t[Zo])
          return ((t) => (e) => {
            const n = t[Zo]();
            if ("function" != typeof n.subscribe)
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            return n.subscribe(e);
          })(t);
        if (Xf(t)) return Zf(t);
        if (ep(t))
          return ((t) => (e) => (
            t
              .then(
                (n) => {
                  e.closed || (e.next(n), e.complete());
                },
                (n) => e.error(n)
              )
              .then(null, Lr),
            e
          ))(t);
        if (t && "function" == typeof t[Di])
          return ((t) => (e) => {
            const n = t[Di]();
            for (;;) {
              let r;
              try {
                r = n.next();
              } catch (o) {
                return e.error(o), e;
              }
              if (r.done) {
                e.complete();
                break;
              }
              if ((e.next(r.value), e.closed)) break;
            }
            return (
              "function" == typeof n.return &&
                e.add(() => {
                  n.return && n.return();
                }),
              e
            );
          })(t);
        {
          const n = `You provided ${
            Wf(t) ? "an invalid object" : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`;
          throw new TypeError(n);
        }
      };
      function Al(t, e) {
        return new me((n) => {
          const r = new De();
          let o = 0;
          return (
            r.add(
              e.schedule(function () {
                o !== t.length
                  ? (n.next(t[o++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function et(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[Zo];
                  })(t)
                )
                  return (function (t, e) {
                    return new me((n) => {
                      const r = new De();
                      return (
                        r.add(
                          e.schedule(() => {
                            const o = t[Zo]();
                            r.add(
                              o.subscribe({
                                next(s) {
                                  r.add(e.schedule(() => n.next(s)));
                                },
                                error(s) {
                                  r.add(e.schedule(() => n.error(s)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (ep(t))
                  return (function (t, e) {
                    return new me((n) => {
                      const r = new De();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (o) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(o),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (o) => {
                                r.add(e.schedule(() => n.error(o)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (Xf(t)) return Al(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[Di];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new me((n) => {
                      const r = new De();
                      let o;
                      return (
                        r.add(() => {
                          o && "function" == typeof o.return && o.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (o = t[Di]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let s, i;
                                  try {
                                    const a = o.next();
                                    (s = a.value), (i = a.done);
                                  } catch (a) {
                                    return void n.error(a);
                                  }
                                  i
                                    ? n.complete()
                                    : (n.next(s), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof me
          ? t
          : new me(Ml(t));
      }
      class kl extends ye {
        constructor(e) {
          super(), (this.parent = e);
        }
        _next(e) {
          this.parent.notifyNext(e);
        }
        _error(e) {
          this.parent.notifyError(e), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class Nl extends ye {
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyError(e) {
          this.destination.error(e);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function Ol(t, e) {
        if (e.closed) return;
        if (t instanceof me) return t.subscribe(e);
        let n;
        try {
          n = Ml(t)(e);
        } catch (r) {
          e.error(r);
        }
        return n;
      }
      function ze(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                ze((o, s) => et(t(o, s)).pipe(P((i, a) => e(o, i, s, a))), n)
              )
          : ("number" == typeof e && (n = e), (r) => r.lift(new Yv(t, n)));
      }
      class Yv {
        constructor(e, n = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = n);
        }
        call(e, n) {
          return n.subscribe(new Zv(e, this.project, this.concurrent));
        }
      }
      class Zv extends Nl {
        constructor(e, n, r = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = n),
            (this.concurrent = r),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let n;
          const r = this.index++;
          try {
            n = this.project(e, r);
          } catch (o) {
            return void this.destination.error(o);
          }
          this.active++, this._innerSub(n);
        }
        _innerSub(e) {
          const n = new kl(this),
            r = this.destination;
          r.add(n);
          const o = Ol(e, n);
          o !== n && r.add(o);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyComplete() {
          const e = this.buffer;
          this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function Xo(t = Number.POSITIVE_INFINITY) {
        return ze(Ci, t);
      }
      function Fl(t, e) {
        return e ? Al(t, e) : new me(Zf(t));
      }
      function Ll() {
        return function (e) {
          return e.lift(new eC(e));
        };
      }
      class eC {
        constructor(e) {
          this.connectable = e;
        }
        call(e, n) {
          const { connectable: r } = this;
          r._refCount++;
          const o = new tC(e, r),
            s = n.subscribe(o);
          return o.closed || (o.connection = r.connect()), s;
        }
      }
      class tC extends ye {
        constructor(e, n) {
          super(e), (this.connectable = n);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const n = e._refCount;
          if (n <= 0) return void (this.connection = null);
          if (((e._refCount = n - 1), n > 1))
            return void (this.connection = null);
          const { connection: r } = this,
            o = e._connection;
          (this.connection = null), o && (!r || o === r) && o.unsubscribe();
        }
      }
      class tp extends me {
        constructor(e, n) {
          super(),
            (this.source = e),
            (this.subjectFactory = n),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let e = this._connection;
          return (
            e ||
              ((this._isComplete = !1),
              (e = this._connection = new De()),
              e.add(this.source.subscribe(new rC(this.getSubject(), this))),
              e.closed && ((this._connection = null), (e = De.EMPTY))),
            e
          );
        }
        refCount() {
          return Ll()(this);
        }
      }
      const nC = (() => {
        const t = tp.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class rC extends Kf {
        constructor(e, n) {
          super(e), (this.connectable = n);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const n = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              n && n.unsubscribe();
          }
        }
      }
      function aC() {
        return new xn();
      }
      function se(t) {
        for (let e in t) if (t[e] === se) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function K(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(K).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function jl(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const uC = se({ __forward_ref__: se });
      function Ul(t) {
        return (
          (t.__forward_ref__ = Ul),
          (t.toString = function () {
            return K(this());
          }),
          t
        );
      }
      function N(t) {
        return (function (t) {
          return (
            "function" == typeof t &&
            t.hasOwnProperty(uC) &&
            t.__forward_ref__ === Ul
          );
        })(t)
          ? t()
          : t;
      }
      class lr extends Error {
        constructor(e, n) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`;
            })(e, n)
          ),
            (this.code = e);
        }
      }
      function z(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function tt(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : z(t);
      }
      function Ei(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new lr("201", `No provider for ${tt(t)} found${n}`);
      }
      function _t(t, e) {
        null == t &&
          (function (t, e, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${t}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`)
            );
          })(e, t, null, "!=");
      }
      function F(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ln(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function In(t) {
        return rp(t, xi) || rp(t, sp);
      }
      function rp(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function op(t) {
        return t && (t.hasOwnProperty(Hl) || t.hasOwnProperty(mC))
          ? t[Hl]
          : null;
      }
      const xi = se({ ɵprov: se }),
        Hl = se({ ɵinj: se }),
        sp = se({ ngInjectableDef: se }),
        mC = se({ ngInjectorDef: se });
      var L = (() => (
        ((L = L || {})[(L.Default = 0)] = "Default"),
        (L[(L.Host = 1)] = "Host"),
        (L[(L.Self = 2)] = "Self"),
        (L[(L.SkipSelf = 4)] = "SkipSelf"),
        (L[(L.Optional = 8)] = "Optional"),
        L
      ))();
      let $l;
      function Hn(t) {
        const e = $l;
        return ($l = t), e;
      }
      function ip(t, e, n) {
        const r = In(t);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & L.Optional
          ? null
          : void 0 !== e
          ? e
          : void Ei(K(t), "Injector");
      }
      function $n(t) {
        return { toString: t }.toString();
      }
      var Tt = (() => (
          ((Tt = Tt || {})[(Tt.OnPush = 0)] = "OnPush"),
          (Tt[(Tt.Default = 1)] = "Default"),
          Tt
        ))(),
        Ne = (() => (
          ((Ne = Ne || {})[(Ne.Emulated = 0)] = "Emulated"),
          (Ne[(Ne.None = 2)] = "None"),
          (Ne[(Ne.ShadowDom = 3)] = "ShadowDom"),
          Ne
        ))();
      const yC = "undefined" != typeof globalThis && globalThis,
        bC = "undefined" != typeof window && window,
        vC =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        ae = yC || ("undefined" != typeof global && global) || bC || vC,
        jr = {},
        de = [],
        Ti = se({ ɵcmp: se }),
        ql = se({ ɵdir: se }),
        Wl = se({ ɵpipe: se }),
        ap = se({ ɵmod: se }),
        CC = se({ ɵloc: se }),
        Sn = se({ ɵfac: se }),
        es = se({ __NG_ELEMENT_ID__: se });
      let wC = 0;
      function ie(t) {
        return $n(() => {
          const n = {},
            r = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Tt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || de,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || Ne.Emulated,
              id: "c",
              styles: t.styles || de,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            o = t.directives,
            s = t.features,
            i = t.pipes;
          return (
            (r.id += wC++),
            (r.inputs = dp(t.inputs, n)),
            (r.outputs = dp(t.outputs)),
            s && s.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(lp)
              : null),
            (r.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(up)
              : null),
            r
          );
        });
      }
      function lp(t) {
        return (
          nt(t) ||
          (function (t) {
            return t[ql] || null;
          })(t)
        );
      }
      function up(t) {
        return (function (t) {
          return t[Wl] || null;
        })(t);
      }
      const cp = {};
      function qn(t) {
        return $n(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || de,
            declarations: t.declarations || de,
            imports: t.imports || de,
            exports: t.exports || de,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (cp[t.id] = t.type), e;
        });
      }
      function dp(t, e) {
        if (null == t) return jr;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let o = t[r],
              s = o;
            Array.isArray(o) && ((s = o[1]), (o = o[0])),
              (n[o] = r),
              e && (e[o] = s);
          }
        return n;
      }
      const Qe = ie;
      function nt(t) {
        return t[Ti] || null;
      }
      function It(t, e) {
        const n = t[ap] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${K(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Q = 11;
      function un(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function qt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Ql(t) {
        return 0 != (8 & t.flags);
      }
      function Ri(t) {
        return 2 == (2 & t.flags);
      }
      function Mi(t) {
        return 1 == (1 & t.flags);
      }
      function Wt(t) {
        return null !== t.template;
      }
      function PC(t) {
        return 0 != (512 & t[2]);
      }
      function pr(t, e) {
        return t.hasOwnProperty(Sn) ? t[Sn] : null;
      }
      class pp {
        constructor(e, n, r) {
          (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function hr() {
        return hp;
      }
      function hp(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = kC), AC;
      }
      function AC() {
        const t = mp(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === jr) t.previous = e;
          else for (let r in e) n[r] = e[r];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function kC(t, e, n, r) {
        const o =
            mp(t) ||
            (function (t, e) {
              return (t[gp] = e);
            })(t, { previous: jr, current: null }),
          s = o.current || (o.current = {}),
          i = o.previous,
          a = this.declaredInputs[n],
          l = i[a];
        (s[a] = new pp(l && l.currentValue, e, i === jr)), (t[r] = e);
      }
      hr.ngInherit = !0;
      const gp = "__ngSimpleChanges__";
      function mp(t) {
        return t[gp] || null;
      }
      let Yl;
      function Ee(t) {
        return !!t.listen;
      }
      const bp = {
        createRenderer: (t, e) =>
          void 0 !== Yl
            ? Yl
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Pe(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Ai(t, e) {
        return Pe(e[t]);
      }
      function Rt(t, e) {
        return Pe(e[t.index]);
      }
      function Xl(t, e) {
        return t.data[e];
      }
      function bt(t, e) {
        const n = e[t];
        return un(n) ? n : n[0];
      }
      function eu(t) {
        return 128 == (128 & t[2]);
      }
      function zn(t, e) {
        return null == e ? null : t[e];
      }
      function Cp(t) {
        t[18] = 0;
      }
      function tu(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const H = {
        lFrame: Pp(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function wp() {
        return H.bindingsEnabled;
      }
      function E() {
        return H.lFrame.lView;
      }
      function re() {
        return H.lFrame.tView;
      }
      function Wr(t) {
        return (H.lFrame.contextLView = t), t[8];
      }
      function Oe() {
        let t = Dp();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Dp() {
        return H.lFrame.currentTNode;
      }
      function cn(t, e) {
        const n = H.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function nu() {
        return H.lFrame.isParent;
      }
      function ki() {
        return H.isInCheckNoChangesMode;
      }
      function Ni(t) {
        H.isInCheckNoChangesMode = t;
      }
      function zr() {
        return H.lFrame.bindingIndex++;
      }
      function Pn(t) {
        const e = H.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function QC(t, e) {
        const n = H.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), ou(e);
      }
      function ou(t) {
        H.lFrame.currentDirectiveIndex = t;
      }
      function iu(t) {
        H.lFrame.currentQueryIndex = t;
      }
      function KC(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function Ip(t, e, n) {
        if (n & L.SkipSelf) {
          let o = e,
            s = t;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & L.Host ||
              ((o = KC(s)), null === o || ((s = s[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (e = o), (t = s);
        }
        const r = (H.lFrame = Sp());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function Oi(t) {
        const e = Sp(),
          n = t[1];
        (H.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Sp() {
        const t = H.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Pp(t) : e;
      }
      function Pp(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Rp() {
        const t = H.lFrame;
        return (
          (H.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const Mp = Rp;
      function Fi() {
        const t = Rp();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function ot() {
        return H.lFrame.selectedIndex;
      }
      function Gn(t) {
        H.lFrame.selectedIndex = t;
      }
      function xe() {
        const t = H.lFrame;
        return Xl(t.tView, t.selectedIndex);
      }
      function Li(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const s = t.data[n].type.prototype,
            {
              ngAfterContentInit: i,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: d,
              ngOnDestroy: f,
            } = s;
          i && (t.contentHooks || (t.contentHooks = [])).push(-n, i),
            a &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, a),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, a)),
            l && (t.viewHooks || (t.viewHooks = [])).push(-n, l),
            d &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, d),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, d)),
            null != f && (t.destroyHooks || (t.destroyHooks = [])).push(n, f);
        }
      }
      function Vi(t, e, n) {
        Ap(t, e, 3, n);
      }
      function ji(t, e, n, r) {
        (3 & t[2]) === n && Ap(t, e, n, r);
      }
      function au(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function Ap(t, e, n, r) {
        const s = null != r ? r : -1,
          i = e.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < i; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != r && a >= r)) break;
          } else
            e[l] < 0 && (t[18] += 65536),
              (a < s || -1 == s) &&
                (sw(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function sw(t, e, n, r) {
        const o = n[r] < 0,
          s = n[r + 1],
          a = t[o ? -n[r] : n[r]];
        if (o) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              s.call(a);
            } finally {
            }
          }
        } else
          try {
            s.call(a);
          } finally {
          }
      }
      class ss {
        constructor(e, n, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ui(t, e, n) {
        const r = Ee(t);
        let o = 0;
        for (; o < n.length; ) {
          const s = n[o];
          if ("number" == typeof s) {
            if (0 !== s) break;
            o++;
            const i = n[o++],
              a = n[o++],
              l = n[o++];
            r ? t.setAttribute(e, a, l, i) : e.setAttributeNS(i, a, l);
          } else {
            const i = s,
              a = n[++o];
            uu(i)
              ? r && t.setProperty(e, i, a)
              : r
              ? t.setAttribute(e, i, a)
              : e.setAttribute(i, a),
              o++;
          }
        }
        return o;
      }
      function kp(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function uu(t) {
        return 64 === t.charCodeAt(0);
      }
      function Bi(t, e) {
        if (null !== e && 0 !== e.length)
          if (null === t || 0 === t.length) t = e.slice();
          else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
              const o = e[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Np(t, n, o, null, -1 === n || 2 === n ? e[++r] : null);
            }
          }
        return t;
      }
      function Np(t, e, n, r, o) {
        let s = 0,
          i = t.length;
        if (-1 === e) i = -1;
        else
          for (; s < t.length; ) {
            const a = t[s++];
            if ("number" == typeof a) {
              if (a === e) {
                i = -1;
                break;
              }
              if (a > e) {
                i = s - 1;
                break;
              }
            }
          }
        for (; s < t.length; ) {
          const a = t[s];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (t[s + 1] = o));
            if (r === t[s + 1]) return void (t[s + 2] = o);
          }
          s++, null !== r && s++, null !== o && s++;
        }
        -1 !== i && (t.splice(i, 0, e), (s = i + 1)),
          t.splice(s++, 0, n),
          null !== r && t.splice(s++, 0, r),
          null !== o && t.splice(s++, 0, o);
      }
      function Op(t) {
        return -1 !== t;
      }
      function Gr(t) {
        return 32767 & t;
      }
      function Qr(t, e) {
        let n = (function (t) {
            return t >> 16;
          })(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let cu = !0;
      function Hi(t) {
        const e = cu;
        return (cu = t), e;
      }
      let dw = 0;
      function as(t, e) {
        const n = fu(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          du(r.data, t),
          du(e, null),
          du(r.blueprint, null));
        const o = $i(t, e),
          s = t.injectorIndex;
        if (Op(o)) {
          const i = Gr(o),
            a = Qr(o, e),
            l = a[1].data;
          for (let d = 0; d < 8; d++) e[s + d] = a[i + d] | l[i + d];
        }
        return (e[s + 8] = o), s;
      }
      function du(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function fu(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function $i(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          o = e;
        for (; null !== o; ) {
          const s = o[1],
            i = s.type;
          if (((r = 2 === i ? s.declTNode : 1 === i ? o[6] : null), null === r))
            return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function qi(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(es) && (r = n[es]),
            null == r && (r = n[es] = dw++);
          const o = 255 & r;
          e.data[t + (o >> 5)] |= 1 << o;
        })(t, e, n);
      }
      function Vp(t, e, n) {
        if (n & L.Optional) return t;
        Ei(e, "NodeInjector");
      }
      function jp(t, e, n, r) {
        if (
          (n & L.Optional && void 0 === r && (r = null),
          0 == (n & (L.Self | L.Host)))
        ) {
          const o = t[9],
            s = Hn(void 0);
          try {
            return o ? o.get(e, r, n & L.Optional) : ip(e, r, n & L.Optional);
          } finally {
            Hn(s);
          }
        }
        return Vp(r, e, n);
      }
      function Up(t, e, n, r = L.Default, o) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(es) ? t[es] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : hw) : e;
          })(n);
          if ("function" == typeof s) {
            if (!Ip(e, t, r)) return r & L.Host ? Vp(o, n, r) : jp(e, n, r, o);
            try {
              const i = s(r);
              if (null != i || r & L.Optional) return i;
              Ei(n);
            } finally {
              Mp();
            }
          } else if ("number" == typeof s) {
            let i = null,
              a = fu(t, e),
              l = -1,
              d = r & L.Host ? e[16][6] : null;
            for (
              (-1 === a || r & L.SkipSelf) &&
              ((l = -1 === a ? $i(t, e) : e[a + 8]),
              -1 !== l && $p(r, !1)
                ? ((i = e[1]), (a = Gr(l)), (e = Qr(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const f = e[1];
              if (Hp(s, a, f.data)) {
                const p = gw(a, e, n, i, r, d);
                if (p !== Bp) return p;
              }
              (l = e[a + 8]),
                -1 !== l && $p(r, e[1].data[a + 8] === d) && Hp(s, a, e)
                  ? ((i = f), (a = Gr(l)), (e = Qr(l, e)))
                  : (a = -1);
            }
          }
        }
        return jp(e, n, r, o);
      }
      const Bp = {};
      function hw() {
        return new Jr(Oe(), E());
      }
      function gw(t, e, n, r, o, s) {
        const i = e[1],
          a = i.data[t + 8],
          f = (function (t, e, n, r, o) {
            const s = t.providerIndexes,
              i = e.data,
              a = 1048575 & s,
              l = t.directiveStart,
              f = s >> 20,
              h = o ? a + f : t.directiveEnd;
            for (let m = r ? a : a + f; m < h; m++) {
              const _ = i[m];
              if ((m < l && n === _) || (m >= l && _.type === n)) return m;
            }
            if (o) {
              const m = i[l];
              if (m && Wt(m) && m.type === n) return l;
            }
            return null;
          })(
            a,
            i,
            n,
            null == r ? Ri(a) && cu : r != i && 0 != (3 & a.type),
            o & L.Host && s === a
          );
        return null !== f ? ls(e, i, f, a) : Bp;
      }
      function ls(t, e, n, r) {
        let o = t[n];
        const s = e.data;
        if (
          (function (t) {
            return t instanceof ss;
          })(o)
        ) {
          const i = o;
          i.resolving &&
            (function (t, e) {
              throw new lr(
                "200",
                `Circular dependency in DI detected for ${t}`
              );
            })(tt(s[n]));
          const a = Hi(i.canSeeViewProviders);
          i.resolving = !0;
          const l = i.injectImpl ? Hn(i.injectImpl) : null;
          Ip(t, r, L.Default);
          try {
            (o = t[n] = i.factory(void 0, s, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (r) {
                    const i = hp(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, o),
                    s &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s));
                })(n, s[n], e);
          } finally {
            null !== l && Hn(l), Hi(a), (i.resolving = !1), Mp();
          }
        }
        return o;
      }
      function Hp(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function $p(t, e) {
        return !(t & L.Self || (t & L.Host && e));
      }
      class Jr {
        constructor(e, n) {
          (this._tNode = e), (this._lView = n);
        }
        get(e, n) {
          return Up(this._tNode, this._lView, e, void 0, n);
        }
      }
      const Yr = "__parameters__";
      function gr(t, e, n) {
        return $n(() => {
          const r = (function (t) {
            return function (...n) {
              if (t) {
                const r = t(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(e);
          function o(...s) {
            if (this instanceof o) return r.apply(this, s), this;
            const i = new o(...s);
            return (a.annotation = i), a;
            function a(l, d, f) {
              const p = l.hasOwnProperty(Yr)
                ? l[Yr]
                : Object.defineProperty(l, Yr, { value: [] })[Yr];
              for (; p.length <= f; ) p.push(null);
              return (p[f] = p[f] || []).push(i), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = t),
            (o.annotationCls = o),
            o
          );
        });
      }
      class ne {
        constructor(e, n) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = F({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const vw = new ne("AnalyzeForEntryComponents"),
        zi = Function;
      function fn(t, e) {
        t.forEach((n) => (Array.isArray(n) ? fn(n, e) : e(n)));
      }
      function Qi(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function mr(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function vt(t, e, n) {
        let r = Xr(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let o = t.length;
                if (o == e) t.push(n, r);
                else if (1 === o) t.push(r, t[0]), (t[0] = n);
                else {
                  for (o--, t.push(t[o - 1], t[o]); o > e; )
                    (t[o] = t[o - 2]), o--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function gu(t, e) {
        const n = Xr(t, e);
        if (n >= 0) return t[1 | n];
      }
      function Xr(t, e) {
        return (function (t, e, n) {
          let r = 0,
            o = t.length >> n;
          for (; o !== r; ) {
            const s = r + ((o - r) >> 1),
              i = t[s << n];
            if (e === i) return s << n;
            i > e ? (o = s) : (r = s + 1);
          }
          return ~(o << n);
        })(t, e, 1);
      }
      const ps = {},
        _u = "__NG_DI_FLAG__",
        eo = "ngTempTokenPath",
        Rw = /\n/gm,
        yu = "__source",
        bu = se({ provide: String, useValue: se });
      let hs;
      function to(t) {
        const e = hs;
        return (hs = t), e;
      }
      function Aw(t, e = L.Default) {
        if (void 0 === hs)
          throw new Error("inject() must be called from an injection context");
        return null === hs
          ? ip(t, void 0, e)
          : hs.get(t, e & L.Optional ? null : void 0, e);
      }
      function S(t, e = L.Default) {
        return ($l || Aw)(N(t), e);
      }
      function _r(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = N(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let o,
              s = L.Default;
            for (let i = 0; i < r.length; i++) {
              const a = r[i],
                l = kw(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (s |= l)
                : (o = a);
            }
            e.push(S(o, s));
          } else e.push(S(r));
        }
        return e;
      }
      function gs(t, e) {
        return (t[_u] = e), (t.prototype[_u] = e), t;
      }
      function kw(t) {
        return t[_u];
      }
      function Jp(t, e, n, r) {
        const o = t[eo];
        throw (
          (e[yu] && o.unshift(e[yu]),
          (t.message = (function (t, e, n, r = null) {
            t =
              t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                ? t.substr(2)
                : t;
            let o = K(e);
            if (Array.isArray(e)) o = e.map(K).join(" -> ");
            else if ("object" == typeof e) {
              let s = [];
              for (let i in e)
                if (e.hasOwnProperty(i)) {
                  let a = e[i];
                  s.push(
                    i + ":" + ("string" == typeof a ? JSON.stringify(a) : K(a))
                  );
                }
              o = `{${s.join(", ")}}`;
            }
            return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${t.replace(
              Rw,
              "\n  "
            )}`;
          })("\n" + t.message, o, n, r)),
          (t.ngTokenPath = o),
          (t[eo] = null),
          t)
        );
      }
      const no = gs(
          gr("Inject", (t) => ({ token: t })),
          -1
        ),
        pt = gs(gr("Optional"), 8),
        Kn = gs(gr("SkipSelf"), 4);
      class yr {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Ct(t) {
        return t instanceof yr ? t.changingThisBreaksApplicationSecurity : t;
      }
      function pn(t, e) {
        const n = (function (t) {
          return (t instanceof yr && t.getTypeName()) || null;
        })(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      const r1 =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        o1 =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var fe = (() => (
        ((fe = fe || {})[(fe.NONE = 0)] = "NONE"),
        (fe[(fe.HTML = 1)] = "HTML"),
        (fe[(fe.STYLE = 2)] = "STYLE"),
        (fe[(fe.SCRIPT = 3)] = "SCRIPT"),
        (fe[(fe.URL = 4)] = "URL"),
        (fe[(fe.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        fe
      ))();
      function U(t) {
        const e = (function () {
          const t = E();
          return t && t[12];
        })();
        return e
          ? e.sanitize(fe.URL, t) || ""
          : pn(t, "URL")
          ? Ct(t)
          : (function (t) {
              return (t = String(t)).match(r1) || t.match(o1)
                ? t
                : "unsafe:" + t;
            })(z(t));
      }
      const hh = "__ngContext__";
      function Ke(t, e) {
        t[hh] = e;
      }
      function Su(t) {
        const e = (function (t) {
          return t[hh] || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function ta(t) {
        return t.ngOriginalError;
      }
      function T1(t, ...e) {
        t.error(...e);
      }
      class br {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const n = this._findOriginalError(e),
            r = this._findContext(e),
            o = (function (t) {
              return (t && t.ngErrorLogger) || T1;
            })(e);
          o(this._console, "ERROR", e),
            n && o(this._console, "ORIGINAL ERROR", n),
            r && o(this._console, "ERROR CONTEXT", r);
        }
        _findContext(e) {
          return e
            ? (function (t) {
                return t.ngDebugContext;
              })(e) || this._findContext(ta(e))
            : null;
        }
        _findOriginalError(e) {
          let n = e && ta(e);
          for (; n && ta(n); ) n = ta(n);
          return n || null;
        }
      }
      const Dh = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(ae))();
      function gn(t) {
        return t instanceof Function ? t() : t;
      }
      var wt = (() => (
        ((wt = wt || {})[(wt.Important = 1)] = "Important"),
        (wt[(wt.DashCase = 2)] = "DashCase"),
        wt
      ))();
      function Mu(t, e) {
        return undefined(t, e);
      }
      function Cs(t) {
        const e = t[3];
        return qt(e) ? e[3] : e;
      }
      function Au(t) {
        return Sh(t[13]);
      }
      function ku(t) {
        return Sh(t[4]);
      }
      function Sh(t) {
        for (; null !== t && !qt(t); ) t = t[4];
        return t;
      }
      function io(t, e, n, r, o) {
        if (null != r) {
          let s,
            i = !1;
          qt(r) ? (s = r) : un(r) && ((i = !0), (r = r[0]));
          const a = Pe(r);
          0 === t && null !== n
            ? null == o
              ? Nh(e, n, a)
              : vr(e, n, a, o || null, !0)
            : 1 === t && null !== n
            ? vr(e, n, a, o || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = ra(t, e);
                r &&
                  (function (t, e, n, r) {
                    Ee(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, i)
            : 3 === t && e.destroyNode(a),
            null != s &&
              (function (t, e, n, r, o) {
                const s = n[7];
                s !== Pe(n) && io(e, t, r, s, o);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  ws(l[1], l, t, e, r, s);
                }
              })(e, t, s, n, o);
        }
      }
      function Ou(t, e, n) {
        return Ee(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function Rh(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          o = e[3];
        1024 & e[2] && ((e[2] &= -1025), tu(o, -1)), n.splice(r, 1);
      }
      function Fu(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const o = r[17];
          null !== o && o !== t && Rh(o, r), e > 0 && (t[n - 1][4] = r[4]);
          const s = mr(t, 10 + e);
          !(function (t, e) {
            ws(t, e, e[Q], 2, null, null), (e[0] = null), (e[6] = null);
          })(r[1], r);
          const i = s[19];
          null !== i && i.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Mh(t, e) {
        if (!(256 & e[2])) {
          const n = e[Q];
          Ee(n) && n.destroyNode && ws(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Lu(t[1], t);
              for (; e; ) {
                let n = null;
                if (un(e)) n = e[13];
                else {
                  const r = e[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    un(e) && Lu(e[1], e), (e = e[3]);
                  null === e && (e = t), un(e) && Lu(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Lu(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = e[n[r]];
                  if (!(o instanceof ss)) {
                    const s = n[r + 1];
                    if (Array.isArray(s))
                      for (let i = 0; i < s.length; i += 2) {
                        const a = o[s[i]],
                          l = s[i + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(o);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let o = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const i = n[s + 1],
                      a = "function" == typeof i ? i(e) : Pe(e[i]),
                      l = r[(o = n[s + 2])],
                      d = n[s + 3];
                    "boolean" == typeof d
                      ? a.removeEventListener(n[s], l, d)
                      : d >= 0
                      ? r[(o = d)]()
                      : r[(o = -d)].unsubscribe(),
                      (s += 2);
                  } else {
                    const i = r[(o = n[s + 1])];
                    n[s].call(i);
                  }
              if (null !== r) {
                for (let s = o + 1; s < r.length; s++) r[s]();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && Ee(e[Q]) && e[Q].destroy();
          const n = e[17];
          if (null !== n && qt(e[3])) {
            n !== e[3] && Rh(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function Ah(t, e, n) {
        return (function (t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = t.data[r.directiveStart].encapsulation;
            if (o === Ne.None || o === Ne.Emulated) return null;
          }
          return Rt(r, n);
        })(t, e.parent, n);
      }
      function vr(t, e, n, r, o) {
        Ee(t) ? t.insertBefore(e, n, r, o) : e.insertBefore(n, r, o);
      }
      function Nh(t, e, n) {
        Ee(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function Oh(t, e, n, r, o) {
        null !== r ? vr(t, e, n, r, o) : Nh(t, e, n);
      }
      function ra(t, e) {
        return Ee(t) ? t.parentNode(e) : e.parentNode;
      }
      let Vh = function (t, e, n) {
        return 40 & t.type ? Rt(t, n) : null;
      };
      function oa(t, e, n, r) {
        const o = Ah(t, r, e),
          s = e[Q],
          a = (function (t, e, n) {
            return Vh(t, e, n);
          })(r.parent || e[6], r, e);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) Oh(s, o, n[l], a, !1);
          else Oh(s, o, n, a, !1);
      }
      function sa(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return Rt(e, t);
          if (4 & n) return ju(-1, t[e.index]);
          if (8 & n) {
            const r = e.child;
            if (null !== r) return sa(t, r);
            {
              const o = t[e.index];
              return qt(o) ? ju(-1, o) : Pe(o);
            }
          }
          if (32 & n) return Mu(e, t)() || Pe(t[e.index]);
          {
            const r = Uh(t, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : sa(Cs(t[16]), r)
              : sa(t, e.next);
          }
        }
        return null;
      }
      function Uh(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function ju(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const r = e[n],
            o = r[1].firstChild;
          if (null !== o) return sa(r, o);
        }
        return e[7];
      }
      function Uu(t, e, n, r, o, s, i) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (i && 0 === e && (a && Ke(Pe(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Uu(t, e, n.child, r, o, s, !1), io(e, t, o, a, s);
            else if (32 & l) {
              const d = Mu(n, r);
              let f;
              for (; (f = d()); ) io(e, t, o, f, s);
              io(e, t, o, a, s);
            } else 16 & l ? Hh(t, e, r, n, o, s) : io(e, t, o, a, s);
          n = i ? n.projectionNext : n.next;
        }
      }
      function ws(t, e, n, r, o, s) {
        Uu(n, r, t.firstChild, e, o, s, !1);
      }
      function Hh(t, e, n, r, o, s) {
        const i = n[16],
          l = i[6].projection[r.projection];
        if (Array.isArray(l))
          for (let d = 0; d < l.length; d++) io(e, t, o, l[d], s);
        else Uu(t, e, l, i[3], o, s, !0);
      }
      function $h(t, e, n) {
        Ee(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Bu(t, e, n) {
        Ee(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function qh(t, e, n) {
        let r = t.length;
        for (;;) {
          const o = t.indexOf(e, n);
          if (-1 === o) return o;
          if (0 === o || t.charCodeAt(o - 1) <= 32) {
            const s = e.length;
            if (o + s === r || t.charCodeAt(o + s) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Wh = "ng-template";
      function Z1(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let o = t[r++];
          if (n && "class" === o) {
            if (((o = t[r]), -1 !== qh(o.toLowerCase(), e, 0))) return !0;
          } else if (1 === o) {
            for (; r < t.length && "string" == typeof (o = t[r++]); )
              if (o.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function zh(t) {
        return 4 === t.type && t.value !== Wh;
      }
      function X1(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Wh);
      }
      function eD(t, e, n) {
        let r = 4;
        const o = t.attrs || [],
          s = (function (t) {
            for (let e = 0; e < t.length; e++) if (kp(t[e])) return e;
            return t.length;
          })(o);
        let i = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !X1(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (zt(r)) return !1;
                  i = !0;
                }
              } else {
                const d = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!Z1(t.attrs, d, n)) {
                    if (zt(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const p = tD(8 & r ? "class" : l, o, zh(t), n);
                if (-1 === p) {
                  if (zt(r)) return !1;
                  i = !0;
                  continue;
                }
                if ("" !== d) {
                  let h;
                  h = p > s ? "" : o[p + 1].toLowerCase();
                  const m = 8 & r ? h : null;
                  if ((m && -1 !== qh(m, d, 0)) || (2 & r && d !== h)) {
                    if (zt(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !zt(r) && !zt(l)) return !1;
            if (i && zt(l)) continue;
            (i = !1), (r = l | (1 & r));
          }
        }
        return zt(r) || i;
      }
      function zt(t) {
        return 0 == (1 & t);
      }
      function tD(t, e, n, r) {
        if (null === e) return -1;
        let o = 0;
        if (r || !n) {
          let s = !1;
          for (; o < e.length; ) {
            const i = e[o];
            if (i === t) return o;
            if (3 === i || 6 === i) s = !0;
            else {
              if (1 === i || 2 === i) {
                let a = e[++o];
                for (; "string" == typeof a; ) a = e[++o];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                o += 4;
                continue;
              }
            }
            o += s ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Gh(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (eD(t, e[r], n)) return !0;
        return !1;
      }
      function Qh(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function iD(t) {
        let e = t[0],
          n = 1,
          r = 2,
          o = "",
          s = !1;
        for (; n < t.length; ) {
          let i = t[n];
          if ("string" == typeof i)
            if (2 & r) {
              const a = t[++n];
              o += "[" + i + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + i) : 4 & r && (o += " " + i);
          else
            "" !== o && !zt(i) && ((e += Qh(s, o)), (o = "")),
              (r = i),
              (s = s || !zt(r));
          n++;
        }
        return "" !== o && (e += Qh(s, o)), e;
      }
      const q = {};
      function y(t) {
        Jh(re(), E(), ot() + t, ki());
      }
      function Jh(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const s = t.preOrderCheckHooks;
            null !== s && Vi(e, s, n);
          } else {
            const s = t.preOrderHooks;
            null !== s && ji(e, s, 0, n);
          }
        Gn(n);
      }
      function ia(t, e) {
        return (t << 17) | (e << 2);
      }
      function Gt(t) {
        return (t >> 17) & 32767;
      }
      function Hu(t) {
        return 2 | t;
      }
      function Rn(t) {
        return (131068 & t) >> 2;
      }
      function $u(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function qu(t) {
        return 1 | t;
      }
      function sg(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              s = n[r + 1];
            if (-1 !== s) {
              const i = t.data[s];
              iu(o), i.contentQueries(2, e[s], s);
            }
          }
      }
      function Ds(t, e, n, r, o, s, i, a, l, d) {
        const f = e.blueprint.slice();
        return (
          (f[0] = o),
          (f[2] = 140 | r),
          Cp(f),
          (f[3] = f[15] = t),
          (f[8] = n),
          (f[10] = i || (t && t[10])),
          (f[Q] = a || (t && t[Q])),
          (f[12] = l || (t && t[12]) || null),
          (f[9] = d || (t && t[9]) || null),
          (f[6] = s),
          (f[16] = 2 == e.type ? t[16] : f),
          f
        );
      }
      function ao(t, e, n, r, o) {
        let s = t.data[e];
        if (null === s)
          (s = (function (t, e, n, r, o) {
            const s = Dp(),
              i = nu(),
              l = (t.data[e] = (function (t, e, n, r, o, s) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, i ? s : s && s.parent, n, e, r, o));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== s &&
                (i
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(t, e, n, r, o)),
            H.lFrame.inI18n && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = n), (s.value = r), (s.attrs = o);
          const i = (function () {
            const t = H.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === i ? -1 : i.injectorIndex;
        }
        return cn(s, !0), s;
      }
      function lo(t, e, n, r) {
        if (0 === n) return -1;
        const o = e.length;
        for (let s = 0; s < n; s++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return o;
      }
      function Es(t, e, n) {
        Oi(e);
        try {
          const r = t.viewQuery;
          null !== r && ic(1, r, n);
          const o = t.template;
          null !== o && ig(t, e, o, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && sg(t, e),
            t.staticViewQueries && ic(2, t.viewQuery, n);
          const s = t.components;
          null !== s &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) jD(t, e[n]);
            })(e, s);
        } catch (r) {
          throw (
            (t.firstCreatePass &&
              ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[2] &= -5), Fi();
        }
      }
      function uo(t, e, n, r) {
        const o = e[2];
        if (256 == (256 & o)) return;
        Oi(e);
        const s = ki();
        try {
          Cp(e),
            (function (t) {
              H.lFrame.bindingIndex = t;
            })(t.bindingStartIndex),
            null !== n && ig(t, e, n, 2, r);
          const i = 3 == (3 & o);
          if (!s)
            if (i) {
              const d = t.preOrderCheckHooks;
              null !== d && Vi(e, d, null);
            } else {
              const d = t.preOrderHooks;
              null !== d && ji(e, d, 0, null), au(e, 0);
            }
          if (
            ((function (t) {
              for (let e = Au(t); null !== e; e = ku(e)) {
                if (!e[2]) continue;
                const n = e[9];
                for (let r = 0; r < n.length; r++) {
                  const o = n[r],
                    s = o[3];
                  0 == (1024 & o[2]) && tu(s, 1), (o[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = Au(t); null !== e; e = ku(e))
                for (let n = 10; n < e.length; n++) {
                  const r = e[n],
                    o = r[1];
                  eu(r) && uo(o, r, o.template, r[8]);
                }
            })(e),
            null !== t.contentQueries && sg(t, e),
            !s)
          )
            if (i) {
              const d = t.contentCheckHooks;
              null !== d && Vi(e, d);
            } else {
              const d = t.contentHooks;
              null !== d && ji(e, d, 1), au(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) Gn(~o);
                  else {
                    const s = o,
                      i = n[++r],
                      a = n[++r];
                    QC(i, s), a(2, e[s]);
                  }
                }
              } finally {
                Gn(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) VD(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && ic(2, l, r), !s))
            if (i) {
              const d = t.viewCheckHooks;
              null !== d && Vi(e, d);
            } else {
              const d = t.viewHooks;
              null !== d && ji(e, d, 2), au(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), tu(e[3], -1));
        } finally {
          Fi();
        }
      }
      function bD(t, e, n, r) {
        const o = e[10],
          s = !ki(),
          i = (function (t) {
            return 4 == (4 & t[2]);
          })(e);
        try {
          s && !i && o.begin && o.begin(), i && Es(t, e, r), uo(t, e, n, r);
        } finally {
          s && !i && o.end && o.end();
        }
      }
      function ig(t, e, n, r, o) {
        const s = ot(),
          i = 2 & r;
        try {
          Gn(-1), i && e.length > 20 && Jh(t, e, 20, ki()), n(r, o);
        } finally {
          Gn(s);
        }
      }
      function Zu(t, e, n) {
        !wp() ||
          ((function (t, e, n, r) {
            const o = n.directiveStart,
              s = n.directiveEnd;
            t.firstCreatePass || as(n, e), Ke(r, e);
            const i = n.initialInputs;
            for (let a = o; a < s; a++) {
              const l = t.data[a],
                d = Wt(l);
              d && kD(e, n, l);
              const f = ls(e, t, a, n);
              Ke(f, e),
                null !== i && ND(0, a - o, f, l, 0, i),
                d && (bt(n.index, e)[8] = f);
            }
          })(t, e, n, Rt(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                a = H.lFrame.currentDirectiveIndex;
              try {
                Gn(i);
                for (let l = r; l < o; l++) {
                  const d = t.data[l],
                    f = e[l];
                  ou(l),
                    (null !== d.hostBindings ||
                      0 !== d.hostVars ||
                      null !== d.hostAttrs) &&
                      gg(d, f);
                }
              } finally {
                Gn(-1), ou(a);
              }
            })(t, e, n));
      }
      function Xu(t, e, n = Rt) {
        const r = e.localNames;
        if (null !== r) {
          let o = e.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const i = r[s + 1],
              a = -1 === i ? n(e, t) : t[i];
            t[o++] = a;
          }
        }
      }
      function lg(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = ua(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function ua(t, e, n, r, o, s, i, a, l, d) {
        const f = 20 + r,
          p = f + o,
          h = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : q);
            return n;
          })(f, p),
          m = "function" == typeof d ? d() : d;
        return (h[1] = {
          type: t,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: h.slice().fill(null, f),
          bindingStartIndex: f,
          expandoStartIndex: p,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof i ? i() : i,
          firstChild: null,
          schemas: l,
          consts: m,
          incompleteFirstPass: !1,
        });
      }
      function fg(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const o = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, o)
              : (n[r] = [e, o]);
          }
        return n;
      }
      function Dt(t, e, n, r, o, s, i, a) {
        const l = Rt(e, n);
        let f,
          d = e.inputs;
        !a && null != d && (f = d[r])
          ? (xg(t, n, f, r, o),
            Ri(e) &&
              (function (t, e) {
                const n = bt(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 & e.type &&
            ((r = (function (t) {
              return "class" === t
                ? "className"
                : "for" === t
                ? "htmlFor"
                : "formaction" === t
                ? "formAction"
                : "innerHtml" === t
                ? "innerHTML"
                : "readonly" === t
                ? "readOnly"
                : "tabindex" === t
                ? "tabIndex"
                : t;
            })(r)),
            (o = null != i ? i(o, e.value || "", r) : o),
            Ee(s)
              ? s.setProperty(l, r, o)
              : uu(r) || (l.setProperty ? l.setProperty(r, o) : (l[r] = o)));
      }
      function ec(t, e, n, r) {
        let o = !1;
        if (wp()) {
          const s = (function (t, e, n) {
              const r = t.directiveRegistry;
              let o = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const i = r[s];
                  Gh(n, i.selectors, !1) &&
                    (o || (o = []),
                    qi(as(n, e), t, i.type),
                    Wt(i) ? (mg(t, n), o.unshift(i)) : o.push(i));
                }
              return o;
            })(t, e, n),
            i = null === r ? null : { "": -1 };
          if (null !== s) {
            (o = !0), _g(n, t.data.length, s.length);
            for (let f = 0; f < s.length; f++) {
              const p = s[f];
              p.providersResolver && p.providersResolver(p);
            }
            let a = !1,
              l = !1,
              d = lo(t, e, s.length, null);
            for (let f = 0; f < s.length; f++) {
              const p = s[f];
              (n.mergedAttrs = Bi(n.mergedAttrs, p.hostAttrs)),
                yg(t, n, e, d, p),
                AD(d, p, i),
                null !== p.contentQueries && (n.flags |= 8),
                (null !== p.hostBindings ||
                  null !== p.hostAttrs ||
                  0 !== p.hostVars) &&
                  (n.flags |= 128);
              const h = p.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                d++;
            }
            !(function (t, e) {
              const r = e.directiveEnd,
                o = t.data,
                s = e.attrs,
                i = [];
              let a = null,
                l = null;
              for (let d = e.directiveStart; d < r; d++) {
                const f = o[d],
                  p = f.inputs,
                  h = null === s || zh(e) ? null : OD(p, s);
                i.push(h), (a = fg(p, d, a)), (l = fg(f.outputs, d, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = a),
                (e.outputs = l);
            })(t, n);
          }
          i &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let o = 0; o < e.length; o += 2) {
                  const s = n[e[o + 1]];
                  if (null == s)
                    throw new lr(
                      "301",
                      `Export of name '${e[o + 1]}' not found!`
                    );
                  r.push(e[o], s);
                }
              }
            })(n, r, i);
        }
        return (n.mergedAttrs = Bi(n.mergedAttrs, n.attrs)), o;
      }
      function hg(t, e, n, r, o, s) {
        const i = s.hostBindings;
        if (i) {
          let a = t.hostBindingOpCodes;
          null === a && (a = t.hostBindingOpCodes = []);
          const l = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, o, i);
        }
      }
      function gg(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function mg(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function AD(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          Wt(e) && (n[""] = t);
        }
      }
      function _g(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function yg(t, e, n, r, o) {
        t.data[r] = o;
        const s = o.factory || (o.factory = pr(o.type)),
          i = new ss(s, Wt(o), null);
        (t.blueprint[r] = i),
          (n[r] = i),
          hg(t, e, 0, r, lo(t, n, o.hostVars, q), o);
      }
      function kD(t, e, n) {
        const r = Rt(e, t),
          o = lg(n),
          s = t[10],
          i = ca(
            t,
            Ds(
              t,
              o,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              s,
              s.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = i;
      }
      function mn(t, e, n, r, o, s) {
        const i = Rt(t, e);
        !(function (t, e, n, r, o, s, i) {
          if (null == s)
            Ee(t) ? t.removeAttribute(e, o, n) : e.removeAttribute(o);
          else {
            const a = null == i ? z(s) : i(s, r || "", o);
            Ee(t)
              ? t.setAttribute(e, o, a, n)
              : n
              ? e.setAttributeNS(n, o, a)
              : e.setAttribute(o, a);
          }
        })(e[Q], i, s, t.value, n, r, o);
      }
      function ND(t, e, n, r, o, s) {
        const i = s[e];
        if (null !== i) {
          const a = r.setInput;
          for (let l = 0; l < i.length; ) {
            const d = i[l++],
              f = i[l++],
              p = i[l++];
            null !== a ? r.setInput(n, p, d, f) : (n[f] = p);
          }
        }
      }
      function OD(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              t.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, t[o], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function bg(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function VD(t, e) {
        const n = bt(e, t);
        if (eu(n)) {
          const r = n[1];
          80 & n[2] ? uo(r, n, r.template, n[8]) : n[5] > 0 && nc(n);
        }
      }
      function nc(t) {
        for (let r = Au(t); null !== r; r = ku(r))
          for (let o = 10; o < r.length; o++) {
            const s = r[o];
            if (1024 & s[2]) {
              const i = s[1];
              uo(i, s, i.template, s[8]);
            } else s[5] > 0 && nc(s);
          }
        const n = t[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = bt(n[r], t);
            eu(o) && o[5] > 0 && nc(o);
          }
      }
      function jD(t, e) {
        const n = bt(e, t),
          r = n[1];
        (function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          Es(r, n, n[8]);
      }
      function ca(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function rc(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Cs(t);
          if (PC(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function sc(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          uo(t, e, t.template, n);
        } catch (o) {
          throw (Eg(e, o), o);
        } finally {
          r.end && r.end();
        }
      }
      function vg(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = Su(n),
              o = r[1];
            bD(o, r, o.template, n);
          }
        })(t[8]);
      }
      function ic(t, e, n) {
        iu(0), e(t, n);
      }
      const qD = (() => Promise.resolve(null))();
      function Cg(t) {
        return t[7] || (t[7] = []);
      }
      function wg(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Eg(t, e) {
        const n = t[9],
          r = n ? n.get(br, null) : null;
        r && r.handleError(e);
      }
      function xg(t, e, n, r, o) {
        for (let s = 0; s < n.length; ) {
          const i = n[s++],
            a = n[s++],
            l = e[i],
            d = t.data[i];
          null !== d.setInput ? d.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function An(t, e, n) {
        const r = Ai(e, t);
        !(function (t, e, n) {
          Ee(t) ? t.setValue(e, n) : (e.textContent = n);
        })(t[Q], r, n);
      }
      function da(t, e, n) {
        let r = n ? t.styles : null,
          o = n ? t.classes : null,
          s = 0;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const a = e[i];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (o = jl(o, a))
              : 2 == s && (r = jl(r, a + ": " + e[++i] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = o) : (t.classesWithoutHost = o);
      }
      const co = new ne("INJECTOR", -1);
      class Tg {
        get(e, n = ps) {
          if (n === ps) {
            const r = new Error(`NullInjectorError: No provider for ${K(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const xs = new ne("Set Injector scope."),
        Ts = {},
        GD = {};
      let ac;
      function Ig() {
        return void 0 === ac && (ac = new Tg()), ac;
      }
      function Sg(t, e = null, n = null, r) {
        return new JD(t, n, e || Ig(), r);
      }
      class JD {
        constructor(e, n, r, o = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          n && fn(n, (a) => this.processProvider(a, e, n)),
            fn([e], (a) => this.processInjectorType(a, [], s)),
            this.records.set(co, fo(void 0, this));
          const i = this.records.get(xs);
          (this.scope = null != i ? i.value : null),
            (this.source = o || ("object" == typeof e ? null : K(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, n = ps, r = L.Default) {
          this.assertNotDestroyed();
          const o = to(this),
            s = Hn(void 0);
          try {
            if (!(r & L.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function (t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && t instanceof ne)
                    );
                  })(e) && In(e);
                (a = l && this.injectableDefInScope(l) ? fo(lc(e), Ts) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (r & L.Self ? Ig() : this.parent).get(
              e,
              (n = r & L.Optional && n === ps ? null : n)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (((i[eo] = i[eo] || []).unshift(K(e)), o)) throw i;
              return Jp(i, e, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            Hn(s), to(o);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((r, o) => e.push(K(o))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(e, n, r) {
          if (!(e = N(e))) return !1;
          let o = op(e);
          const s = (null == o && e.ngModule) || void 0,
            i = void 0 === s ? e : s,
            a = -1 !== r.indexOf(i);
          if ((void 0 !== s && (o = op(s)), null == o)) return !1;
          if (null != o.imports && !a) {
            let f;
            r.push(i);
            try {
              fn(o.imports, (p) => {
                this.processInjectorType(p, n, r) &&
                  (void 0 === f && (f = []), f.push(p));
              });
            } finally {
            }
            if (void 0 !== f)
              for (let p = 0; p < f.length; p++) {
                const { ngModule: h, providers: m } = f[p];
                fn(m, (_) => this.processProvider(_, h, m || de));
              }
          }
          this.injectorDefTypes.add(i);
          const l = pr(i) || (() => new i());
          this.records.set(i, fo(l, Ts));
          const d = o.providers;
          if (null != d && !a) {
            const f = e;
            fn(d, (p) => this.processProvider(p, f, d));
          }
          return void 0 !== s && void 0 !== e.providers;
        }
        processProvider(e, n, r) {
          let o = po((e = N(e))) ? e : N(e && e.provide);
          const s = (function (t, e, n) {
            return Rg(t)
              ? fo(void 0, t.useValue)
              : fo(
                  (function (t, e, n) {
                    let r;
                    if (po(t)) {
                      const o = N(t);
                      return pr(o) || lc(o);
                    }
                    if (Rg(t)) r = () => N(t.useValue);
                    else if (
                      (function (t) {
                        return !(!t || !t.useFactory);
                      })(t)
                    )
                      r = () => t.useFactory(..._r(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => S(N(t.useExisting));
                    else {
                      const o = N(t && (t.useClass || t.provide));
                      if (
                        !(function (t) {
                          return !!t.deps;
                        })(t)
                      )
                        return pr(o) || lc(o);
                      r = () => new o(..._r(t.deps));
                    }
                    return r;
                  })(t),
                  Ts
                );
          })(e);
          if (po(e) || !0 !== e.multi) this.records.get(o);
          else {
            let i = this.records.get(o);
            i ||
              ((i = fo(void 0, Ts, !0)),
              (i.factory = () => _r(i.multi)),
              this.records.set(o, i)),
              (o = e),
              i.multi.push(e);
          }
          this.records.set(o, s);
        }
        hydrate(e, n) {
          return (
            n.value === Ts && ((n.value = GD), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function (t) {
                return (
                  null !== t &&
                  "object" == typeof t &&
                  "function" == typeof t.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const n = N(e.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function lc(t) {
        const e = In(t),
          n = null !== e ? e.factory : pr(t);
        if (null !== n) return n;
        if (t instanceof ne)
          throw new Error(`Token ${K(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const r = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push(e);
                return n;
              })(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${K(t)}: (${r.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[xi] || t[sp]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function fo(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Rg(t) {
        return null !== t && "object" == typeof t && bu in t;
      }
      function po(t) {
        return "function" == typeof t;
      }
      const Mg = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const o = Sg(t, e, n, r);
          return o._resolveInjectorDefTypes(), o;
        })({ name: n }, e, t, n);
      };
      let ue = (() => {
        class t {
          static create(n, r) {
            return Array.isArray(n)
              ? Mg(n, r, "")
              : Mg(n.providers, n.parent, n.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = ps),
          (t.NULL = new Tg()),
          (t.ɵprov = F({ token: t, providedIn: "any", factory: () => S(co) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function mE(t, e) {
        Li(Su(t)[1], Oe());
      }
      let fa = null;
      function ho() {
        if (!fa) {
          const t = ae.Symbol;
          if (t && t.iterator) fa = t.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < e.length; ++n) {
              const r = e[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (fa = r);
            }
          }
        }
        return fa;
      }
      function Ss(t) {
        return (
          !!gc(t) && (Array.isArray(t) || (!(t instanceof Map) && ho() in t))
        );
      }
      function gc(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Ye(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function mc(t, e, n, r) {
        const o = E();
        return Ye(o, zr(), e) && (re(), mn(xe(), o, t, e, n, r)), mc;
      }
      function mo(t, e, n, r) {
        return Ye(t, zr(), n) ? e + z(n) + r : q;
      }
      function _o(t, e, n, r, o, s) {
        const a = (function (t, e, n, r) {
          const o = Ye(t, e, n);
          return Ye(t, e + 1, r) || o;
        })(t, H.lFrame.bindingIndex, n, o);
        return Pn(2), a ? e + z(n) + r + z(o) + s : q;
      }
      function oe(t, e, n, r, o, s, i, a) {
        const l = E(),
          d = re(),
          f = t + 20,
          p = d.firstCreatePass
            ? (function (t, e, n, r, o, s, i, a, l) {
                const d = e.consts,
                  f = ao(e, t, 4, i || null, zn(d, a));
                ec(e, n, f, zn(d, l)), Li(e, f);
                const p = (f.tViews = ua(
                  2,
                  f,
                  r,
                  o,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  d
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, f),
                    (p.queries = e.queries.embeddedTView(f))),
                  f
                );
              })(f, d, l, e, n, r, o, s, i)
            : d.data[f];
        cn(p, !1);
        const h = l[Q].createComment("");
        oa(d, l, h, p),
          Ke(h, l),
          ca(l, (l[f] = bg(h, l, h, p))),
          Mi(p) && Zu(d, l, p),
          null != i && Xu(l, p, a);
      }
      function T(t, e = L.Default) {
        const n = E();
        return null === n ? S(t, e) : Up(Oe(), n, N(t), e);
      }
      function O(t, e, n) {
        const r = E();
        return Ye(r, zr(), e) && Dt(re(), xe(), r, t, e, r[Q], n, !1), O;
      }
      function Cc(t, e, n, r, o) {
        const i = o ? "class" : "style";
        xg(t, n, e.inputs[i], i, r);
      }
      function u(t, e, n, r) {
        const o = E(),
          s = re(),
          i = 20 + t,
          a = o[Q],
          l = (o[i] = Ou(a, e, H.lFrame.currentNamespace)),
          d = s.firstCreatePass
            ? (function (t, e, n, r, o, s, i) {
                const a = e.consts,
                  d = ao(e, t, 2, o, zn(a, s));
                return (
                  ec(e, n, d, zn(a, i)),
                  null !== d.attrs && da(d, d.attrs, !1),
                  null !== d.mergedAttrs && da(d, d.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, d),
                  d
                );
              })(i, s, o, 0, e, n, r)
            : s.data[i];
        cn(d, !0);
        const f = d.mergedAttrs;
        null !== f && Ui(a, l, f);
        const p = d.classes;
        null !== p && Bu(a, l, p);
        const h = d.styles;
        null !== h && $h(a, l, h),
          64 != (64 & d.flags) && oa(s, o, l, d),
          0 === H.lFrame.elementDepthCount && Ke(l, o),
          H.lFrame.elementDepthCount++,
          Mi(d) &&
            (Zu(s, o, d),
            (function (t, e, n) {
              if (Ql(e)) {
                const o = e.directiveEnd;
                for (let s = e.directiveStart; s < o; s++) {
                  const i = t.data[s];
                  i.contentQueries && i.contentQueries(1, n[s], s);
                }
              }
            })(s, d, o)),
          null !== r && Xu(o, d);
      }
      function c() {
        let t = Oe();
        nu() ? (H.lFrame.isParent = !1) : ((t = t.parent), cn(t, !1));
        const e = t;
        H.lFrame.elementDepthCount--;
        const n = re();
        n.firstCreatePass && (Li(n, t), Ql(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Cc(n, e, E(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Cc(n, e, E(), e.stylesWithoutHost, !1);
      }
      function I(t, e, n, r) {
        u(t, e, n, r), c();
      }
      function Rs() {
        return E();
      }
      function ga(t) {
        return !!t && "function" == typeof t.then;
      }
      const wc = function (t) {
        return !!t && "function" == typeof t.subscribe;
      };
      function D(t, e, n, r) {
        const o = E(),
          s = re(),
          i = Oe();
        return (
          (function (t, e, n, r, o, s, i, a) {
            const l = Mi(r),
              f = t.firstCreatePass && wg(t),
              p = e[8],
              h = Cg(e);
            let m = !0;
            if (3 & r.type || a) {
              const b = Rt(r, e),
                w = a ? a(b) : b,
                C = h.length,
                M = a ? (k) => a(Pe(k[r.index])) : r.index;
              if (Ee(n)) {
                let k = null;
                if (
                  (!a &&
                    l &&
                    (k = (function (t, e, n, r) {
                      const o = t.cleanup;
                      if (null != o)
                        for (let s = 0; s < o.length - 1; s += 2) {
                          const i = o[s];
                          if (i === n && o[s + 1] === r) {
                            const a = e[7],
                              l = o[s + 2];
                            return a.length > l ? a[l] : null;
                          }
                          "string" == typeof i && (s += 2);
                        }
                      return null;
                    })(t, e, o, r.index)),
                  null !== k)
                )
                  ((k.__ngLastListenerFn__ || k).__ngNextListenerFn__ = s),
                    (k.__ngLastListenerFn__ = s),
                    (m = !1);
                else {
                  s = Dc(r, e, p, s, !1);
                  const Y = n.listen(w, o, s);
                  h.push(s, Y), f && f.push(o, M, C, C + 1);
                }
              } else
                (s = Dc(r, e, p, s, !0)),
                  w.addEventListener(o, s, i),
                  h.push(s),
                  f && f.push(o, M, C, i);
            } else s = Dc(r, e, p, s, !1);
            const _ = r.outputs;
            let v;
            if (m && null !== _ && (v = _[o])) {
              const b = v.length;
              if (b)
                for (let w = 0; w < b; w += 2) {
                  const Ue = e[v[w]][v[w + 1]].subscribe(s),
                    Bt = h.length;
                  h.push(s, Ue), f && f.push(o, r.index, Bt, -(Bt + 1));
                }
            }
          })(s, o, o[Q], i, t, e, !!n, r),
          D
        );
      }
      function Cm(t, e, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Eg(t, o), !1;
        }
      }
      function Dc(t, e, n, r, o) {
        return function s(i) {
          if (i === Function) return r;
          const a = 2 & t.flags ? bt(t.index, e) : e;
          0 == (32 & e[2]) && rc(a);
          let l = Cm(e, 0, r, i),
            d = s.__ngNextListenerFn__;
          for (; d; ) (l = Cm(e, 0, d, i) && l), (d = d.__ngNextListenerFn__);
          return o && !1 === l && (i.preventDefault(), (i.returnValue = !1)), l;
        };
      }
      function Nt(t = 1) {
        return (function (t) {
          return (H.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, H.lFrame.contextLView))[8];
        })(t);
      }
      function B(t, e, n) {
        return Ec(t, "", e, "", n), B;
      }
      function Ec(t, e, n, r, o) {
        const s = E(),
          i = mo(s, e, n, r);
        return i !== q && Dt(re(), xe(), s, t, i, s[Q], o, !1), Ec;
      }
      function Rm(t, e, n, r, o) {
        const s = t[n + 1],
          i = null === e;
        let a = r ? Gt(s) : Rn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || i); ) {
          const f = t[a + 1];
          ax(t[a], e) && ((l = !0), (t[a + 1] = r ? qu(f) : Hu(f))),
            (a = r ? Gt(f) : Rn(f));
        }
        l && (t[n + 1] = r ? Hu(s) : qu(s));
      }
      function ax(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && Xr(t, e) >= 0)
        );
      }
      const Le = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Mm(t) {
        return t.substring(Le.key, Le.keyEnd);
      }
      function Am(t, e) {
        const n = Le.textEnd;
        return n === e
          ? -1
          : ((e = Le.keyEnd =
              (function (t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32; ) e++;
                return e;
              })(t, (Le.key = e), n)),
            xo(t, e, n));
      }
      function xo(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function bn(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (Le.key = 0),
                  (Le.keyEnd = 0),
                  (Le.value = 0),
                  (Le.valueEnd = 0),
                  (Le.textEnd = t.length);
              })(t),
              Am(t, xo(t, 0, Le.textEnd))
            );
          })(e);
          n >= 0;
          n = Am(e, n)
        )
          vt(t, Mm(e), !0);
      }
      function Yt(t, e, n, r) {
        const o = re(),
          s = Pn(2);
        o.firstUpdatePass &&
          (function (t, e, n, r) {
            const o = t.data;
            if (null === o[n + 1]) {
              const s = o[ot()],
                i = jm(t, n);
              qm(s, r) && null === e && !i && (e = !1),
                (e = (function (t, e, n, r) {
                  const o = (function (t) {
                    const e = H.lFrame.currentDirectiveIndex;
                    return -1 === e ? null : t[e];
                  })(t);
                  let s = r ? e.residualClasses : e.residualStyles;
                  if (null === o)
                    0 === (r ? e.classBindings : e.styleBindings) &&
                      ((n = Ms((n = xc(null, t, e, n, r)), e.attrs, r)),
                      (s = null));
                  else {
                    const i = e.directiveStylingLast;
                    if (-1 === i || t[i] !== o)
                      if (((n = xc(o, t, e, n, r)), null === s)) {
                        let l = (function (t, e, n) {
                          const r = n ? e.classBindings : e.styleBindings;
                          if (0 !== Rn(r)) return t[Gt(r)];
                        })(t, e, r);
                        void 0 !== l &&
                          Array.isArray(l) &&
                          ((l = xc(null, t, e, l[1], r)),
                          (l = Ms(l, e.attrs, r)),
                          (function (t, e, n, r) {
                            t[Gt(n ? e.classBindings : e.styleBindings)] = r;
                          })(t, e, r, l));
                      } else
                        s = (function (t, e, n) {
                          let r;
                          const o = e.directiveEnd;
                          for (let s = 1 + e.directiveStylingLast; s < o; s++)
                            r = Ms(r, t[s].hostAttrs, n);
                          return Ms(r, e.attrs, n);
                        })(t, e, r);
                  }
                  return (
                    void 0 !== s &&
                      (r ? (e.residualClasses = s) : (e.residualStyles = s)),
                    n
                  );
                })(o, s, e, r)),
                (function (t, e, n, r, o, s) {
                  let i = s ? e.classBindings : e.styleBindings,
                    a = Gt(i),
                    l = Rn(i);
                  t[r] = n;
                  let f,
                    d = !1;
                  if (Array.isArray(n)) {
                    const p = n;
                    (f = p[1]), (null === f || Xr(p, f) > 0) && (d = !0);
                  } else f = n;
                  if (o)
                    if (0 !== l) {
                      const h = Gt(t[a + 1]);
                      (t[r + 1] = ia(h, a)),
                        0 !== h && (t[h + 1] = $u(t[h + 1], r)),
                        (t[a + 1] = (function (t, e) {
                          return (131071 & t) | (e << 17);
                        })(t[a + 1], r));
                    } else
                      (t[r + 1] = ia(a, 0)),
                        0 !== a && (t[a + 1] = $u(t[a + 1], r)),
                        (a = r);
                  else
                    (t[r + 1] = ia(l, 0)),
                      0 === a ? (a = r) : (t[l + 1] = $u(t[l + 1], r)),
                      (l = r);
                  d && (t[r + 1] = Hu(t[r + 1])),
                    Rm(t, f, r, !0),
                    Rm(t, f, r, !1),
                    (function (t, e, n, r, o) {
                      const s = o ? t.residualClasses : t.residualStyles;
                      null != s &&
                        "string" == typeof e &&
                        Xr(s, e) >= 0 &&
                        (n[r + 1] = qu(n[r + 1]));
                    })(e, f, t, r, s),
                    (i = ia(a, l)),
                    s ? (e.classBindings = i) : (e.styleBindings = i);
                })(o, s, e, n, i, r);
            }
          })(o, null, s, r);
        const i = E();
        if (n !== q && Ye(i, s, n)) {
          const a = o.data[ot()];
          if (qm(a, r) && !jm(o, s)) {
            let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== l && (n = jl(l, n || "")), Cc(o, a, i, n, r);
          } else
            !(function (t, e, n, r, o, s, i, a) {
              o === q && (o = de);
              let l = 0,
                d = 0,
                f = 0 < o.length ? o[0] : null,
                p = 0 < s.length ? s[0] : null;
              for (; null !== f || null !== p; ) {
                const h = l < o.length ? o[l + 1] : void 0,
                  m = d < s.length ? s[d + 1] : void 0;
                let v,
                  _ = null;
                f === p
                  ? ((l += 2), (d += 2), h !== m && ((_ = p), (v = m)))
                  : null === p || (null !== f && f < p)
                  ? ((l += 2), (_ = f))
                  : ((d += 2), (_ = p), (v = m)),
                  null !== _ && Hm(t, e, n, r, _, v, i, a),
                  (f = l < o.length ? o[l] : null),
                  (p = d < s.length ? s[d] : null);
              }
            })(
              o,
              a,
              i,
              i[Q],
              i[s + 1],
              (i[s + 1] = (function (t, e, n) {
                if (null == n || "" === n) return de;
                const r = [],
                  o = Ct(n);
                if (Array.isArray(o))
                  for (let s = 0; s < o.length; s++) t(r, o[s], !0);
                else if ("object" == typeof o)
                  for (const s in o) o.hasOwnProperty(s) && t(r, s, o[s]);
                else "string" == typeof o && e(r, o);
                return r;
              })(t, e, n)),
              r,
              s
            );
        }
      }
      function jm(t, e) {
        return e >= t.expandoStartIndex;
      }
      function xc(t, e, n, r, o) {
        let s = null;
        const i = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < i && ((s = e[a]), (r = Ms(r, s.hostAttrs, o)), s !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function Ms(t, e, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const i = e[s];
            "number" == typeof i
              ? (o = i)
              : o === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                vt(t, i, !!n || e[++s]));
          }
        return void 0 === t ? null : t;
      }
      function Hm(t, e, n, r, o, s, i, a) {
        if (!(3 & e.type)) return;
        const l = t.data,
          d = l[a + 1];
        ma(
          (function (t) {
            return 1 == (1 & t);
          })(d)
            ? $m(l, e, n, o, Rn(d), i)
            : void 0
        ) ||
          (ma(s) ||
            ((function (t) {
              return 2 == (2 & t);
            })(d) &&
              (s = $m(l, null, n, o, a, i))),
          (function (t, e, n, r, o) {
            const s = Ee(t);
            if (e)
              o
                ? s
                  ? t.addClass(n, r)
                  : n.classList.add(r)
                : s
                ? t.removeClass(n, r)
                : n.classList.remove(r);
            else {
              let i = -1 === r.indexOf("-") ? void 0 : wt.DashCase;
              if (null == o)
                s ? t.removeStyle(n, r, i) : n.style.removeProperty(r);
              else {
                const a = "string" == typeof o && o.endsWith("!important");
                a && ((o = o.slice(0, -10)), (i |= wt.Important)),
                  s
                    ? t.setStyle(n, r, o, i)
                    : n.style.setProperty(r, o, a ? "important" : "");
              }
            }
          })(r, i, Ai(ot(), n), o, s));
      }
      function $m(t, e, n, r, o, s) {
        const i = null === e;
        let a;
        for (; o > 0; ) {
          const l = t[o],
            d = Array.isArray(l),
            f = d ? l[1] : l,
            p = null === f;
          let h = n[o + 1];
          h === q && (h = p ? de : void 0);
          let m = p ? gu(h, r) : f === r ? h : void 0;
          if ((d && !ma(m) && (m = gu(l, r)), ma(m) && ((a = m), i))) return a;
          const _ = t[o + 1];
          o = i ? Gt(_) : Rn(_);
        }
        if (null !== e) {
          let l = s ? e.residualClasses : e.residualStyles;
          null != l && (a = gu(l, r));
        }
        return a;
      }
      function ma(t) {
        return void 0 !== t;
      }
      function qm(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function g(t, e = "") {
        const n = E(),
          r = re(),
          o = t + 20,
          s = r.firstCreatePass ? ao(r, o, 1, e, null) : r.data[o],
          i = (n[o] = (function (t, e) {
            return Ee(t) ? t.createText(e) : t.createTextNode(e);
          })(n[Q], e));
        oa(r, n, i, s), cn(s, !1);
      }
      function x(t) {
        return it("", t, ""), x;
      }
      function it(t, e, n) {
        const r = E(),
          o = mo(r, t, e, n);
        return o !== q && An(r, ot(), o), it;
      }
      function Tc(t, e, n, r, o) {
        const s = E(),
          i = _o(s, t, e, n, r, o);
        return i !== q && An(s, ot(), i), Tc;
      }
      function He(t, e, n) {
        Yt(vt, bn, mo(E(), t, e, n), !0);
      }
      function vn(t, e, n, r, o) {
        Yt(vt, bn, _o(E(), t, e, n, r, o), !0);
      }
      function Ic(t, e, n) {
        const r = E();
        return Ye(r, zr(), e) && Dt(re(), xe(), r, t, e, r[Q], n, !0), Ic;
      }
      const wr = void 0;
      var Ux = [
        "en",
        [["a", "p"], ["AM", "PM"], wr],
        [["AM", "PM"], wr, wr],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        wr,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        wr,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", wr, "{1} 'at' {0}", wr],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          const e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let To = {};
      function at(t) {
        const e = (function (t) {
          return t.toLowerCase().replace(/_/g, "-");
        })(t);
        let n = u_(e);
        if (n) return n;
        const r = e.split("-")[0];
        if (((n = u_(r)), n)) return n;
        if ("en" === r) return Ux;
        throw new Error(`Missing locale data for the locale "${t}".`);
      }
      function u_(t) {
        return (
          t in To ||
            (To[t] =
              ae.ng &&
              ae.ng.common &&
              ae.ng.common.locales &&
              ae.ng.common.locales[t]),
          To[t]
        );
      }
      var A = (() => (
        ((A = A || {})[(A.LocaleId = 0)] = "LocaleId"),
        (A[(A.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (A[(A.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (A[(A.DaysFormat = 3)] = "DaysFormat"),
        (A[(A.DaysStandalone = 4)] = "DaysStandalone"),
        (A[(A.MonthsFormat = 5)] = "MonthsFormat"),
        (A[(A.MonthsStandalone = 6)] = "MonthsStandalone"),
        (A[(A.Eras = 7)] = "Eras"),
        (A[(A.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (A[(A.WeekendRange = 9)] = "WeekendRange"),
        (A[(A.DateFormat = 10)] = "DateFormat"),
        (A[(A.TimeFormat = 11)] = "TimeFormat"),
        (A[(A.DateTimeFormat = 12)] = "DateTimeFormat"),
        (A[(A.NumberSymbols = 13)] = "NumberSymbols"),
        (A[(A.NumberFormats = 14)] = "NumberFormats"),
        (A[(A.CurrencyCode = 15)] = "CurrencyCode"),
        (A[(A.CurrencySymbol = 16)] = "CurrencySymbol"),
        (A[(A.CurrencyName = 17)] = "CurrencyName"),
        (A[(A.Currencies = 18)] = "Currencies"),
        (A[(A.Directionality = 19)] = "Directionality"),
        (A[(A.PluralCase = 20)] = "PluralCase"),
        (A[(A.ExtraData = 21)] = "ExtraData"),
        A
      ))();
      const _a = "en-US";
      let c_ = _a;
      function Sc(t) {
        _t(t, "Expected localeId to be defined"),
          "string" == typeof t && (c_ = t.toLowerCase().replace(/_/g, "-"));
      }
      class O_ {}
      const L_ = "ngComponent";
      class BT {
        resolveComponentFactory(e) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${K(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e[L_] = t), e;
          })(e);
        }
      }
      let Dr = (() => {
        class t {}
        return (t.NULL = new BT()), t;
      })();
      function wa(...t) {}
      function So(t, e) {
        return new Et(Rt(t, e));
      }
      const qT = function () {
        return So(Oe(), E());
      };
      let Et = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = qT), t;
      })();
      class Da {}
      let Fc = (() => {
        class t {}
        return (
          (t.ɵprov = F({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class xa {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const j_ = new xa("12.2.10");
      class U_ {
        constructor() {}
        supports(e) {
          return Ss(e);
        }
        create(e) {
          return new KT(e);
        }
      }
      const JT = (t, e) => e;
      class KT {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || JT);
        }
        forEachItem(e) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) e(n);
        }
        forEachOperation(e) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            s = null;
          for (; n || r; ) {
            const i = !r || (n && n.currentIndex < H_(r, o, s)) ? n : r,
              a = H_(i, o, s),
              l = i.currentIndex;
            if (i === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == i.previousIndex)) o++;
            else {
              s || (s = []);
              const d = a - o,
                f = l - o;
              if (d != f) {
                for (let h = 0; h < d; h++) {
                  const m = h < s.length ? s[h] : (s[h] = 0),
                    _ = m + h;
                  f <= _ && _ < d && (s[h] = m + 1);
                }
                s[i.previousIndex] = f - d;
              }
            }
            a !== l && e(i, a, l);
          }
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachMovedItem(e) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        forEachIdentityChange(e) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            e(n);
        }
        diff(e) {
          if ((null == e && (e = []), !Ss(e)))
            throw new Error(
              `Error trying to diff '${K(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let o,
            s,
            i,
            n = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (s = e[a]),
                (i = this._trackByFn(a, s)),
                null !== n && Object.is(n.trackById, i)
                  ? (r && (n = this._verifyReinsertion(n, s, i, a)),
                    Object.is(n.item, s) || this._addIdentityChange(n, s))
                  : ((n = this._mismatch(n, s, i, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[ho()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(e, (a) => {
                (i = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, i)
                    ? (r && (n = this._verifyReinsertion(n, a, i, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, i, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, n, r, o) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._reinsertAfter(e, s, o))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._moveAfter(e, s, o))
              : (e = this._addAfter(new YT(n, r), s, o)),
            e
          );
        }
        _verifyReinsertion(e, n, r, o) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, o))
              : e.currentIndex != o &&
                ((e.currentIndex = o), this._addToMoves(e, o)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const n = e._next;
            this._addToRemovals(this._unlink(e)), (e = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const o = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === o ? (this._removalsHead = s) : (o._nextRemoved = s),
            null === s ? (this._removalsTail = o) : (s._prevRemoved = o),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, n, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, n, r) {
          return (
            this._insertAfter(e, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (e._next = o),
            (e._prev = n),
            null === o ? (this._itTail = e) : (o._prev = e),
            null === n ? (this._itHead = e) : (n._next = e),
            null === this._linkedRecords && (this._linkedRecords = new B_()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const n = e._prev,
            r = e._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            e
          );
        }
        _addToMoves(e, n) {
          return (
            e.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new B_()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, n) {
          return (
            (e.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class YT {
        constructor(e, n) {
          (this.item = e),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class ZT {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const n = e._prevDup,
            r = e._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class B_ {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const n = e.trackById;
          let r = this.map.get(n);
          r || ((r = new ZT()), this.map.set(n, r)), r.add(e);
        }
        get(e, n) {
          const o = this.map.get(e);
          return o ? o.get(e, n) : null;
        }
        remove(e) {
          const n = e.trackById;
          return this.map.get(n).remove(e) && this.map.delete(n), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function H_(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + e + o;
      }
      class $_ {
        constructor() {}
        supports(e) {
          return e instanceof Map || gc(e);
        }
        create() {
          return new XT();
        }
      }
      class XT {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) e(n);
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachChangedItem(e) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || gc(e)))
              throw new Error(
                `Error trying to diff '${K(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const s = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, s);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, n) {
          if (e) {
            const r = e._prev;
            return (
              (n._next = e),
              (n._prev = r),
              (e._prev = n),
              r && (r._next = n),
              e === this._mapHead && (this._mapHead = n),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(e, n) {
          if (this._records.has(e)) {
            const o = this._records.get(e);
            this._maybeAddToChanges(o, n);
            const s = o._prev,
              i = o._next;
            return (
              s && (s._next = i),
              i && (i._prev = s),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new eI(e);
          return (
            this._records.set(e, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, n) {
          Object.is(n, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = n),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, n) {
          e instanceof Map
            ? e.forEach(n)
            : Object.keys(e).forEach((r) => n(e[r], r));
        }
      }
      class eI {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function q_() {
        return new Fs([new U_()]);
      }
      let Fs = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || q_()),
              deps: [[t, new Kn(), new pt()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new Error(
              `Cannot find a differ supporting object '${n}' of type '${(function (
                t
              ) {
                return t.name || typeof t;
              })(n)}'`
            );
          }
        }
        return (t.ɵprov = F({ token: t, providedIn: "root", factory: q_ })), t;
      })();
      function W_() {
        return new Po([new $_()]);
      }
      let Po = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || W_()),
              deps: [[t, new Kn(), new pt()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new Error(`Cannot find a differ supporting object '${n}'`);
          }
        }
        return (t.ɵprov = F({ token: t, providedIn: "root", factory: W_ })), t;
      })();
      function Ta(t, e, n, r, o = !1) {
        for (; null !== n; ) {
          const s = e[n.index];
          if ((null !== s && r.push(Pe(s)), qt(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                d = l[1].firstChild;
              null !== d && Ta(l[1], l, d, r);
            }
          const i = n.type;
          if (8 & i) Ta(t, e, n.child, r);
          else if (32 & i) {
            const a = Mu(n, e);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & i) {
            const a = Uh(e, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Cs(e[16]);
              Ta(l[1], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Ls {
        constructor(e, n) {
          (this._lView = e),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            n = e[1];
          return Ta(n, e, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (qt(e)) {
              const n = e[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Fu(e, r), mr(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Mh(this._lView[1], this._lView);
        }
        onDestroy(e) {
          !(function (t, e, n, r) {
            const o = Cg(e);
            null === n
              ? o.push(r)
              : (o.push(n), t.firstCreatePass && wg(t).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          rc(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          sc(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Ni(!0);
            try {
              sc(t, e, n);
            } finally {
              Ni(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function (t, e) {
              ws(t, e, e[Q], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
      }
      class nI extends Ls {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          vg(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Ni(!0);
            try {
              vg(t);
            } finally {
              Ni(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const oI = function (t) {
        return (function (t, e, n) {
          if (Ri(t) && !n) {
            const r = bt(t.index, e);
            return new Ls(r, r);
          }
          return 47 & t.type ? new Ls(e[16], e) : null;
        })(Oe(), E(), 16 == (16 & t));
      };
      let Lc = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = oI), t;
      })();
      const aI = [new $_()],
        uI = new Fs([new U_()]),
        cI = new Po(aI),
        fI = function () {
          return (function (t, e) {
            return 4 & t.type ? new hI(e, t, So(t, e)) : null;
          })(Oe(), E());
        };
      let Nn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = fI), t;
      })();
      const pI = Nn,
        hI = class extends pI {
          constructor(e, n, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(e) {
            const n = this._declarationTContainer.tViews,
              r = Ds(
                this._declarationLView,
                n,
                e,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (r[19] = s.createEmbeddedView(n)),
              Es(n, r, e),
              new Ls(r)
            );
          }
        };
      class Cn {}
      class z_ {}
      const _I = function () {
        return (function (t, e) {
          let n;
          const r = e[t.index];
          if (qt(r)) n = r;
          else {
            let o;
            if (8 & t.type) o = Pe(r);
            else {
              const s = e[Q];
              o = s.createComment("");
              const i = Rt(t, e);
              vr(
                s,
                ra(s, i),
                o,
                (function (t, e) {
                  return Ee(t) ? t.nextSibling(e) : e.nextSibling;
                })(s, i),
                !1
              );
            }
            (e[t.index] = n = bg(r, e, o, t)), ca(e, n);
          }
          return new G_(n, t, e);
        })(Oe(), E());
      };
      let Zt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = _I), t;
      })();
      const bI = Zt,
        G_ = class extends bI {
          constructor(e, n, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return So(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Jr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = $i(this._hostTNode, this._hostLView);
            if (Op(e)) {
              const n = Qr(e, this._hostLView),
                r = Gr(e);
              return new Jr(n[1].data[r + 8], n);
            }
            return new Jr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const n = Q_(this._lContainer);
            return (null !== n && n[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, n, r) {
            const o = e.createEmbeddedView(n || {});
            return this.insert(o, r), o;
          }
          createComponent(e, n, r, o, s) {
            const i = r || this.parentInjector;
            if (!s && null == e.ngModule && i) {
              const l = i.get(Cn, null);
              l && (s = l);
            }
            const a = e.create(i, o, void 0, s);
            return this.insert(a.hostView, n), a;
          }
          insert(e, n) {
            const r = e._lView,
              o = r[1];
            if (
              (function (t) {
                return qt(t[3]);
              })(r)
            ) {
              const f = this.indexOf(e);
              if (-1 !== f) this.detach(f);
              else {
                const p = r[3],
                  h = new G_(p, p[6], p[3]);
                h.detach(h.indexOf(e));
              }
            }
            const s = this._adjustIndex(n),
              i = this._lContainer;
            !(function (t, e, n, r) {
              const o = 10 + r,
                s = n.length;
              r > 0 && (n[o - 1][4] = e),
                r < s - 10
                  ? ((e[4] = n[o]), Qi(n, 10 + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const i = e[17];
              null !== i &&
                n !== i &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(i, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(o, r, i, s);
            const a = ju(s, i),
              l = r[Q],
              d = ra(l, i[7]);
            return (
              null !== d &&
                (function (t, e, n, r, o, s) {
                  (r[0] = o), (r[6] = e), ws(t, r, n, 1, o, s);
                })(o, i[6], l, r, d, a),
              e.attachToViewContainerRef(),
              Qi(Vc(i), s, e),
              e
            );
          }
          move(e, n) {
            return this.insert(e, n);
          }
          indexOf(e) {
            const n = Q_(this._lContainer);
            return null !== n ? n.indexOf(e) : -1;
          }
          remove(e) {
            const n = this._adjustIndex(e, -1),
              r = Fu(this._lContainer, n);
            r && (mr(Vc(this._lContainer), n), Mh(r[1], r));
          }
          detach(e) {
            const n = this._adjustIndex(e, -1),
              r = Fu(this._lContainer, n);
            return r && null != mr(Vc(this._lContainer), n) ? new Ls(r) : null;
          }
          _adjustIndex(e, n = 0) {
            return null == e ? this.length + n : e;
          }
        };
      function Q_(t) {
        return t[8];
      }
      function Vc(t) {
        return t[8] || (t[8] = []);
      }
      const ko = {};
      class gy extends Dr {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const n = nt(e);
          return new _y(n, this.ngModule);
        }
      }
      function my(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const gS = new ne("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Dh,
      });
      class _y extends O_ {
        constructor(e, n) {
          super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = (function (t) {
              return t.map(iD).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return my(this.componentDef.inputs);
        }
        get outputs() {
          return my(this.componentDef.outputs);
        }
        create(e, n, r, o) {
          const s = (o = o || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, o) => {
                      const s = t.get(n, ko, o);
                      return s !== ko || r === ko ? s : e.get(n, r, o);
                    },
                  };
                })(e, o.injector)
              : e,
            i = s.get(Da, bp),
            a = s.get(Fc, null),
            l = i.createRenderer(null, this.componentDef),
            d = this.componentDef.selectors[0][0] || "div",
            f = r
              ? (function (t, e, n) {
                  if (Ee(t)) return t.selectRootElement(e, n === Ne.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(l, r, this.componentDef.encapsulation)
              : Ou(
                  i.createRenderer(null, this.componentDef),
                  d,
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(d)
                ),
            p = this.componentDef.onPush ? 576 : 528,
            h = (function (t, e) {
              return {
                components: [],
                scheduler: t || Dh,
                clean: qD,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            m = ua(0, null, null, 1, 0, null, null, null, null, null),
            _ = Ds(null, m, h, p, null, null, i, l, a, s);
          let v, b;
          Oi(_);
          try {
            const w = (function (t, e, n, r, o, s) {
              const i = n[1];
              n[20] = t;
              const l = ao(i, 20, 2, "#host", null),
                d = (l.mergedAttrs = e.hostAttrs);
              null !== d &&
                (da(l, d, !0),
                null !== t &&
                  (Ui(o, t, d),
                  null !== l.classes && Bu(o, t, l.classes),
                  null !== l.styles && $h(o, t, l.styles)));
              const f = r.createRenderer(t, e),
                p = Ds(
                  n,
                  lg(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  l,
                  r,
                  f,
                  s || null,
                  null
                );
              return (
                i.firstCreatePass &&
                  (qi(as(l, n), i, e.type), mg(i, l), _g(l, n.length, 1)),
                ca(n, p),
                (n[20] = p)
              );
            })(f, this.componentDef, _, i, l);
            if (f)
              if (r) Ui(l, f, ["ng-version", j_.full]);
              else {
                const { attrs: C, classes: M } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < t.length; ) {
                    let s = t[r];
                    if ("string" == typeof s)
                      2 === o
                        ? "" !== s && e.push(s, t[++r])
                        : 8 === o && n.push(s);
                    else {
                      if (!zt(o)) break;
                      o = s;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                C && Ui(l, f, C), M && M.length > 0 && Bu(l, f, M.join(" "));
              }
            if (((b = Xl(m, 20)), void 0 !== n)) {
              const C = (b.projection = []);
              for (let M = 0; M < this.ngContentSelectors.length; M++) {
                const k = n[M];
                C.push(null != k ? Array.from(k) : null);
              }
            }
            (v = (function (t, e, n, r, o) {
              const s = n[1],
                i = (function (t, e, n) {
                  const r = Oe();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    yg(t, r, e, lo(t, e, 1, null), n));
                  const o = ls(e, t, r.directiveStart, r);
                  Ke(o, e);
                  const s = Rt(r, e);
                  return s && Ke(s, e), o;
                })(s, n, e);
              if (
                (r.components.push(i),
                (t[8] = i),
                o && o.forEach((l) => l(i, e)),
                e.contentQueries)
              ) {
                const l = Oe();
                e.contentQueries(1, i, l.directiveStart);
              }
              const a = Oe();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Gn(a.index),
                  hg(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  gg(e, i)),
                i
              );
            })(w, this.componentDef, _, h, [mE])),
              Es(m, _, null);
          } finally {
            Fi();
          }
          return new yS(this.componentType, v, So(b, _), _, b);
        }
      }
      class yS extends class {} {
        constructor(e, n, r, o, s) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = s),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new nI(o)),
            (this.componentType = e);
        }
        get injector() {
          return new Jr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      const No = new Map();
      class CS extends Cn {
        constructor(e, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new gy(this));
          const r = It(e),
            o = (function (t) {
              return t[CC] || null;
            })(e);
          o && Sc(o),
            (this._bootstrapComponents = gn(r.bootstrap)),
            (this._r3Injector = Sg(
              e,
              n,
              [
                { provide: Cn, useValue: this },
                { provide: Dr, useValue: this.componentFactoryResolver },
              ],
              K(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, n = ue.THROW_IF_NOT_FOUND, r = L.Default) {
          return e === ue || e === Cn || e === co
            ? this
            : this._r3Injector.get(e, n, r);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Yc extends z_ {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== It(e) &&
              (function (t) {
                const e = new Set();
                !(function n(r) {
                  const o = It(r, !0),
                    s = o.id;
                  null !== s &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${K(
                            e
                          )} vs ${K(e.name)}`
                        );
                    })(s, No.get(s), r),
                    No.set(s, r));
                  const i = gn(o.imports);
                  for (const a of i) e.has(a) || (e.add(a), n(a));
                })(t);
              })(e);
        }
        create(e) {
          return new CS(this.moduleType, e);
        }
      }
      function Zc(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const Lt = class extends xn {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, n, r) {
          var o, s, i;
          let a = e,
            l = n || (() => null),
            d = r;
          if (e && "object" == typeof e) {
            const p = e;
            (a = null === (o = p.next) || void 0 === o ? void 0 : o.bind(p)),
              (l = null === (s = p.error) || void 0 === s ? void 0 : s.bind(p)),
              (d =
                null === (i = p.complete) || void 0 === i ? void 0 : i.bind(p));
          }
          this.__isAsync && ((l = Zc(l)), a && (a = Zc(a)), d && (d = Zc(d)));
          const f = super.subscribe({ next: a, error: l, complete: d });
          return e instanceof De && e.add(f), f;
        }
      };
      Symbol;
      const Js = new ne("Application Initializer");
      let Fo = (() => {
        class t {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = wa),
              (this.reject = wa),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const s = this.appInits[o]();
                if (ga(s)) n.push(s);
                else if (wc(s)) {
                  const i = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  n.push(i);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(Js, 8));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ks = new ne("AppId"),
        DP = {
          provide: Ks,
          useFactory: function () {
            return `${fd()}${fd()}${fd()}`;
          },
          deps: [],
        };
      function fd() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Gy = new ne("Platform Initializer"),
        Oa = new ne("Platform ID"),
        Qy = new ne("appBootstrapListener");
      let Fa = (() => {
        class t {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const er = new ne("LocaleId"),
        Jy = new ne("DefaultCurrencyCode");
      class xP {
        constructor(e, n) {
          (this.ngModuleFactory = e), (this.componentFactories = n);
        }
      }
      const pd = function (t) {
          return new Yc(t);
        },
        TP = pd,
        IP = function (t) {
          return Promise.resolve(pd(t));
        },
        Ky = function (t) {
          const e = pd(t),
            r = gn(It(t).declarations).reduce((o, s) => {
              const i = nt(s);
              return i && o.push(new _y(i)), o;
            }, []);
          return new xP(e, r);
        },
        SP = Ky,
        PP = function (t) {
          return Promise.resolve(Ky(t));
        };
      let Tr = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = TP),
              (this.compileModuleAsync = IP),
              (this.compileModuleAndAllComponentsSync = SP),
              (this.compileModuleAndAllComponentsAsync = PP);
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const AP = (() => Promise.resolve(0))();
      function hd(t) {
        "undefined" == typeof Zone
          ? AP.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Re {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Lt(!1)),
            (this.onMicrotaskEmpty = new Lt(!1)),
            (this.onStable = new Lt(!1)),
            (this.onError = new Lt(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function () {
              let t = ae.requestAnimationFrame,
                e = ae.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(ae, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                md(t),
                                (t.isCheckStableRunning = !0),
                                gd(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    md(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, s, i, a) => {
                  try {
                    return Yy(t), n.invokeTask(o, s, i, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Zy(t);
                  }
                },
                onInvoke: (n, r, o, s, i, a, l) => {
                  try {
                    return Yy(t), n.invoke(o, s, i, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Zy(t);
                  }
                },
                onHasTask: (n, r, o, s) => {
                  n.hasTask(o, s),
                    r === o &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          md(t),
                          gd(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (n, r, o, s) => (
                  n.handleError(o, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Re.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Re.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, n, r) {
          return this._inner.run(e, n, r);
        }
        runTask(e, n, r, o) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + o, e, NP, wa, wa);
          try {
            return s.runTask(i, n, r);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(e, n, r) {
          return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const NP = {};
      function gd(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function md(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Yy(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Zy(t) {
        t._nesting--, gd(t);
      }
      class LP {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Lt()),
            (this.onMicrotaskEmpty = new Lt()),
            (this.onStable = new Lt()),
            (this.onError = new Lt());
        }
        run(e, n, r) {
          return e.apply(n, r);
        }
        runGuarded(e, n, r) {
          return e.apply(n, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, n, r, o) {
          return e.apply(n, r);
        }
      }
      let _d = (() => {
          class t {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Re.assertNotInAngularZone(),
                        hd(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                hd(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let s = -1;
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (i) => i.timeoutId !== s
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(Re));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Xy = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), yd.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return yd.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class VP {
        addToWindow(e) {}
        findTestabilityInTree(e, n, r) {
          return null;
        }
      }
      let yd = new VP(),
        e0 = !0,
        t0 = !1;
      let tn;
      const r0 = new ne("AllowMultipleToken");
      class bd {
        constructor(e, n) {
          (this.name = e), (this.token = n);
        }
      }
      function o0(t, e, n = []) {
        const r = `Platform: ${e}`,
          o = new ne(r);
        return (s = []) => {
          let i = s0();
          if (!i || i.injector.get(r0, !1))
            if (t) t(n.concat(s).concat({ provide: o, useValue: !0 }));
            else {
              const a = n
                .concat(s)
                .concat(
                  { provide: o, useValue: !0 },
                  { provide: xs, useValue: "platform" }
                );
              !(function (t) {
                if (tn && !tn.destroyed && !tn.injector.get(r0, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                tn = t.get(i0);
                const e = t.get(Gy, null);
                e && e.forEach((n) => n());
              })(ue.create({ providers: a, name: r }));
            }
          return (function (t) {
            const e = s0();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(o);
        };
      }
      function s0() {
        return tn && !tn.destroyed ? tn : null;
      }
      let i0 = (() => {
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new LP()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Re({
                          enableLongStackTrace: ((t0 = !0), e0),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: Re, useValue: a }];
            return a.run(() => {
              const d = ue.create({
                  providers: l,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                f = n.create(d),
                p = f.injector.get(br, null);
              if (!p)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                a.runOutsideAngular(() => {
                  const h = a.onError.subscribe({
                    next: (m) => {
                      p.handleError(m);
                    },
                  });
                  f.onDestroy(() => {
                    vd(this._modules, f), h.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return ga(r)
                      ? r.catch((o) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(p, a, () => {
                  const h = f.injector.get(Fo);
                  return (
                    h.runInitializers(),
                    h.donePromise.then(
                      () => (
                        Sc(f.injector.get(er, _a) || _a),
                        this._moduleDoBootstrap(f),
                        f
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = a0({}, r);
            return (function (t, e, n) {
              const r = new Yc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Lo);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${K(
                    n.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(ue));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function a0(t, e) {
        return Array.isArray(e)
          ? e.reduce(a0, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Lo = (() => {
        class t {
          constructor(n, r, o, s, i) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new me((d) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    d.next(this._stable), d.complete();
                  });
              }),
              l = new me((d) => {
                let f;
                this._zone.runOutsideAngular(() => {
                  f = this._zone.onStable.subscribe(() => {
                    Re.assertNotInAngularZone(),
                      hd(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), d.next(!0));
                      });
                  });
                });
                const p = this._zone.onUnstable.subscribe(() => {
                  Re.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        d.next(!1);
                      }));
                });
                return () => {
                  f.unsubscribe(), p.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                wi(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof me
                  ? t[0]
                  : Xo(e)(Fl(t, n))
              );
            })(
              a,
              l.pipe((t) =>
                Ll()(
                  (function (t, e) {
                    return function (r) {
                      let o;
                      o =
                        "function" == typeof t
                          ? t
                          : function () {
                              return t;
                            };
                      const s = Object.create(r, nC);
                      return (s.source = r), (s.subjectFactory = o), s;
                    };
                  })(aC)(t)
                )
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let o;
            (o =
              n instanceof O_
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const s = (function (t) {
                return t.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(Cn),
              a = o.create(ue.NULL, [], r || o.selector, s),
              l = a.location.nativeElement,
              d = a.injector.get(_d, null),
              f = d && a.injector.get(Xy);
            return (
              d && f && f.registerApplication(l, d),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  vd(this.components, a),
                  f && f.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            vd(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Qy, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(Re), S(ue), S(br), S(Dr), S(Fo));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function vd(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Va {}
      class XP {}
      const eR = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let tR = (() => {
        class t {
          constructor(n, r) {
            (this._compiler = n), (this._config = r || eR);
          }
          load(n) {
            return this.loadAndCompile(n);
          }
          loadAndCompile(n) {
            let [r, o] = n.split("#");
            return (
              void 0 === o && (o = "default"),
              Yo(255)(r)
                .then((s) => s[o])
                .then((s) => d0(s, r, o))
                .then((s) => this._compiler.compileModuleAsync(s))
            );
          }
          loadFactory(n) {
            let [r, o] = n.split("#"),
              s = "NgFactory";
            return (
              void 0 === o && ((o = "default"), (s = "")),
              Yo(255)(
                this._config.factoryPathPrefix +
                  r +
                  this._config.factoryPathSuffix
              )
                .then((i) => i[o + s])
                .then((i) => d0(i, r, o))
            );
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(Tr), S(XP, 8));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function d0(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const dR = o0(null, "core", [
          { provide: Oa, useValue: "unknown" },
          { provide: i0, deps: [ue] },
          { provide: Xy, deps: [] },
          { provide: Fa, deps: [] },
        ]),
        mR = [
          { provide: Lo, useClass: Lo, deps: [Re, ue, br, Dr, Fo] },
          {
            provide: gS,
            deps: [Re],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (n) {
                  e.push(n);
                }
              );
            },
          },
          { provide: Fo, useClass: Fo, deps: [[new pt(), Js]] },
          { provide: Tr, useClass: Tr, deps: [] },
          DP,
          {
            provide: Fs,
            useFactory: function () {
              return uI;
            },
            deps: [],
          },
          {
            provide: Po,
            useFactory: function () {
              return cI;
            },
            deps: [],
          },
          {
            provide: er,
            useFactory: function (t) {
              return (
                Sc(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    _a)
                ),
                t
              );
            },
            deps: [[new no(er), new pt(), new Kn()]],
          },
          { provide: Jy, useValue: "USD" },
        ];
      let yR = (() => {
          class t {
            constructor(n) {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(Lo));
            }),
            (t.ɵmod = qn({ type: t })),
            (t.ɵinj = ln({ providers: mR })),
            t
          );
        })(),
        Qa = null;
      function nr() {
        return Qa;
      }
      const We = new ne("DocumentToken");
      let Pr = (() => {
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = F({ factory: _M, token: t, providedIn: "platform" })),
          t
        );
      })();
      function _M() {
        return S(O0);
      }
      const yM = new ne("Location Initialized");
      let O0 = (() => {
        class t extends Pr {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return nr().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = nr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = nr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, o) {
            F0() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            F0()
              ? this._history.replaceState(n, r, o)
              : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(We));
          }),
          (t.ɵprov = F({ factory: bM, token: t, providedIn: "platform" })),
          t
        );
      })();
      function F0() {
        return !!window.history.pushState;
      }
      function bM() {
        return new O0(S(We));
      }
      function Od(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function L0(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function Fn(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let Rr = (() => {
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = F({ factory: vM, token: t, providedIn: "root" })),
          t
        );
      })();
      function vM(t) {
        const e = S(We).location;
        return new V0(S(Pr), (e && e.origin) || "");
      }
      const Fd = new ne("appBaseHref");
      let V0 = (() => {
          class t extends Rr {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Od(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Fn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, s) {
              const i = this.prepareExternalUrl(o + Fn(s));
              this._platformLocation.pushState(n, r, i);
            }
            replaceState(n, r, o, s) {
              const i = this.prepareExternalUrl(o + Fn(s));
              this._platformLocation.replaceState(n, r, i);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(Pr), S(Fd, 8));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        j0 = (() => {
          class t extends Rr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Od(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, s) {
              let i = this.prepareExternalUrl(o + Fn(s));
              0 == i.length && (i = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, i);
            }
            replaceState(n, r, o, s) {
              let i = this.prepareExternalUrl(o + Fn(s));
              0 == i.length && (i = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, i);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(Pr), S(Fd, 8));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ja = (() => {
          class t {
            constructor(n, r) {
              (this._subject = new Lt()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const o = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = L0(U0(o))),
                this._platformStrategy.onPopState((s) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type,
                  });
                });
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Fn(r));
            }
            normalize(n) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, U0(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._platformStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Fn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._platformStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Fn(r)),
                  o
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformStrategy).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(Rr), S(Pr));
            }),
            (t.normalizeQueryParams = Fn),
            (t.joinWithSlash = Od),
            (t.stripTrailingSlash = L0),
            (t.ɵprov = F({ factory: CM, token: t, providedIn: "root" })),
            t
          );
        })();
      function CM() {
        return new Ja(S(Rr), S(Pr));
      }
      function U0(t) {
        return t.replace(/\/index.html$/, "");
      }
      var Me = (() => (
        ((Me = Me || {})[(Me.Zero = 0)] = "Zero"),
        (Me[(Me.One = 1)] = "One"),
        (Me[(Me.Two = 2)] = "Two"),
        (Me[(Me.Few = 3)] = "Few"),
        (Me[(Me.Many = 4)] = "Many"),
        (Me[(Me.Other = 5)] = "Other"),
        Me
      ))();
      function Xa(t, e) {
        return at(t)[A.NumberFormats][e];
      }
      const PM = function (t) {
        return at(t)[A.PluralCase];
      };
      class il {}
      let oA = (() => {
        class t extends il {
          constructor(n) {
            super(), (this.locale = n);
          }
          getPluralCategory(n, r) {
            switch (PM(r || this.locale)(n)) {
              case Me.Zero:
                return "zero";
              case Me.One:
                return "one";
              case Me.Two:
                return "two";
              case Me.Few:
                return "few";
              case Me.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(er));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function J0(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const r = n.indexOf("="),
            [o, s] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      class aA {
        constructor(e, n, r, o) {
          (this.$implicit = e),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let je = (() => {
        class t {
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (r) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${(function (
                      t
                    ) {
                      return t.name || typeof t;
                    })(
                      n
                    )}'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = [];
            n.forEachOperation((o, s, i) => {
              if (null == o.previousIndex) {
                const a = this._viewContainer.createEmbeddedView(
                    this._template,
                    new aA(null, this._ngForOf, -1, -1),
                    null === i ? void 0 : i
                  ),
                  l = new K0(o, a);
                r.push(l);
              } else if (null == i)
                this._viewContainer.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = this._viewContainer.get(s);
                this._viewContainer.move(a, i);
                const l = new K0(o, a);
                r.push(l);
              }
            });
            for (let o = 0; o < r.length; o++)
              this._perViewChange(r[o].view, r[o].record);
            for (let o = 0, s = this._viewContainer.length; o < s; o++) {
              const i = this._viewContainer.get(o);
              (i.context.index = o),
                (i.context.count = s),
                (i.context.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              this._viewContainer.get(o.currentIndex).context.$implicit =
                o.item;
            });
          }
          _perViewChange(n, r) {
            n.context.$implicit = r.item;
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Zt), T(Nn), T(Fs));
          }),
          (t.ɵdir = Qe({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class K0 {
        constructor(e, n) {
          (this.record = e), (this.view = n);
        }
      }
      let Y0 = (() => {
        class t {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new uA()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Z0("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Z0("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Zt), T(Nn));
          }),
          (t.ɵdir = Qe({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class uA {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Z0(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${K(e)}'.`
          );
      }
      let OA = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = qn({ type: t })),
          (t.ɵinj = ln({ providers: [{ provide: il, useClass: oA }] })),
          t
        );
      })();
      let nb = (() => {
        class t {}
        return (
          (t.ɵprov = F({
            token: t,
            providedIn: "root",
            factory: () => new jA(S(We), window),
          })),
          t
        );
      })();
      class jA {
        constructor(e, n) {
          (this.document = e), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (!this.supportsScrolling()) return;
          const n = (function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if (
              "function" == typeof t.createTreeWalker &&
              t.body &&
              (t.body.createShadowRoot || t.body.attachShadow)
            ) {
              const r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const s = o.shadowRoot;
                if (s) {
                  const i =
                    s.getElementById(e) || s.querySelector(`[name="${e}"]`);
                  if (i) return i;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, e);
          n && (this.scrollToElement(n), this.attemptFocus(n));
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const n = e.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(r - s[0], o - s[1]);
        }
        attemptFocus(e) {
          return e.focus(), this.document.activeElement === e;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const e =
              rb(this.window.history) ||
              rb(Object.getPrototypeOf(this.window.history));
            return !(!e || (!e.writable && !e.set));
          } catch (e) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (e) {
            return !1;
          }
        }
      }
      function rb(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class ob {}
      class Qd extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function (t) {
            Qa || (Qa = t);
          })(new Qd());
        }
        onAndCancel(e, n, r) {
          return (
            e.addEventListener(n, r, !1),
            () => {
              e.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(e, n) {
          e.dispatchEvent(n);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, n) {
          return (n = n || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, n) {
          return "window" === n
            ? window
            : "document" === n
            ? e
            : "body" === n
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const n =
            ((ri = ri || document.querySelector("base")),
            ri ? ri.getAttribute("href") : null);
          return null == n
            ? null
            : (function (t) {
                (al = al || document.createElement("a")),
                  al.setAttribute("href", t);
                const e = al.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(n);
        }
        resetBaseElement() {
          ri = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return J0(document.cookie, e);
        }
      }
      let al,
        ri = null;
      const sb = new ne("TRANSITION_ID"),
        WA = [
          {
            provide: Js,
            useFactory: function (t, e, n) {
              return () => {
                n.get(Fo).donePromise.then(() => {
                  const r = nr(),
                    o = e.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let s = 0; s < o.length; s++) r.remove(o[s]);
                });
              };
            },
            deps: [sb, We, ue],
            multi: !0,
          },
        ];
      class Jd {
        static init() {
          !(function (t) {
            yd = t;
          })(new Jd());
        }
        addToWindow(e) {
          (ae.getAngularTestability = (r, o = !0) => {
            const s = e.findTestabilityInTree(r, o);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (ae.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (ae.getAllAngularRootElements = () => e.getAllRootElements()),
            ae.frameworkStabilizers || (ae.frameworkStabilizers = []),
            ae.frameworkStabilizers.push((r) => {
              const o = ae.getAllAngularTestabilities();
              let s = o.length,
                i = !1;
              const a = function (l) {
                (i = i || l), s--, 0 == s && r(i);
              };
              o.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(e, n, r) {
          if (null == n) return null;
          const o = e.getTestability(n);
          return null != o
            ? o
            : r
            ? nr().isShadowRoot(n)
              ? this.findTestabilityInTree(e, n.host, !0)
              : this.findTestabilityInTree(e, n.parentElement, !0)
            : null;
        }
      }
      let zA = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const oi = new ne("EventManagerPlugins");
      let ul = (() => {
        class t {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let s = 0; s < o.length; s++) {
              const i = o[s];
              if (i.supports(n)) return this._eventNameToPlugin.set(n, i), i;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(oi), S(Re));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Kd {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, n, r) {
          const o = nr().getGlobalEventTarget(this._doc, e);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let ab = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        si = (() => {
          class t extends ab {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((s) => {
                const i = this._doc.createElement("style");
                (i.textContent = s), o.push(r.appendChild(i));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(lb), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(lb));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(We));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function lb(t) {
        nr().remove(t);
      }
      const Yd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Zd = /%COMP%/g;
      function cl(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let o = e[r];
          Array.isArray(o) ? cl(t, o, n) : ((o = o.replace(Zd, t)), n.push(o));
        }
        return n;
      }
      function db(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Xd = (() => {
        class t {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ef(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Ne.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new a2(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case Ne.ShadowDom:
                return new l2(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = cl(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(ul), S(si), S(Ks));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class ef {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, n) {
          return n
            ? document.createElementNS(Yd[n] || n, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, n) {
          e.appendChild(n);
        }
        insertBefore(e, n, r) {
          e && e.insertBefore(n, r);
        }
        removeChild(e, n) {
          e && e.removeChild(n);
        }
        selectRootElement(e, n) {
          let r = "string" == typeof e ? document.querySelector(e) : e;
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const s = Yd[o];
            s ? e.setAttributeNS(s, n, r) : e.setAttribute(n, r);
          } else e.setAttribute(n, r);
        }
        removeAttribute(e, n, r) {
          if (r) {
            const o = Yd[r];
            o ? e.removeAttributeNS(o, n) : e.removeAttribute(`${r}:${n}`);
          } else e.removeAttribute(n);
        }
        addClass(e, n) {
          e.classList.add(n);
        }
        removeClass(e, n) {
          e.classList.remove(n);
        }
        setStyle(e, n, r, o) {
          o & (wt.DashCase | wt.Important)
            ? e.style.setProperty(n, r, o & wt.Important ? "important" : "")
            : (e.style[n] = r);
        }
        removeStyle(e, n, r) {
          r & wt.DashCase ? e.style.removeProperty(n) : (e.style[n] = "");
        }
        setProperty(e, n, r) {
          e[n] = r;
        }
        setValue(e, n) {
          e.nodeValue = n;
        }
        listen(e, n, r) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, n, db(r))
            : this.eventManager.addEventListener(e, n, db(r));
        }
      }
      class a2 extends ef {
        constructor(e, n, r, o) {
          super(e), (this.component = r);
          const s = cl(o + "-" + r.id, r.styles, []);
          n.addStyles(s),
            (this.contentAttr = (function (t) {
              return "_ngcontent-%COMP%".replace(Zd, t);
            })(o + "-" + r.id)),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(Zd, t);
            })(o + "-" + r.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, n) {
          const r = super.createElement(e, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class l2 extends ef {
        constructor(e, n, r, o) {
          super(e),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = cl(o.id, o.styles, []);
          for (let i = 0; i < s.length; i++) {
            const a = document.createElement("style");
            (a.textContent = s[i]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, n) {
          return super.appendChild(this.nodeOrShadowRoot(e), n);
        }
        insertBefore(e, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
        }
        removeChild(e, n) {
          return super.removeChild(this.nodeOrShadowRoot(e), n);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let u2 = (() => {
        class t extends Kd {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(We));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const hb = ["alt", "control", "meta", "shift"],
        m2 = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        gb = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        _2 = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let y2 = (() => {
        class t extends Kd {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const s = t.parseEventName(r),
              i = t.eventCallback(s.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => nr().onAndCancel(n, s.domEventName, i));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const s = t._normalizeKey(r.pop());
            let i = "";
            if (
              (hb.forEach((l) => {
                const d = r.indexOf(l);
                d > -1 && (r.splice(d, 1), (i += l + "."));
              }),
              (i += s),
              0 != r.length || 0 === s.length)
            )
              return null;
            const a = {};
            return (a.domEventName = o), (a.fullKey = i), a;
          }
          static getEventFullKey(n) {
            let r = "",
              o = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && gb.hasOwnProperty(e) && (e = gb[e]));
                }
                return m2[e] || e;
              })(n);
            return (
              (o = o.toLowerCase()),
              " " === o ? (o = "space") : "." === o && (o = "dot"),
              hb.forEach((s) => {
                s != o && _2[s](n) && (r += s + ".");
              }),
              (r += o),
              r
            );
          }
          static eventCallback(n, r, o) {
            return (s) => {
              t.getEventFullKey(s) === n && o.runGuarded(() => r(s));
            };
          }
          static _normalizeKey(n) {
            switch (n) {
              case "esc":
                return "escape";
              default:
                return n;
            }
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(We));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const T2 = o0(dR, "browser", [
          { provide: Oa, useValue: "browser" },
          {
            provide: Gy,
            useValue: function () {
              Qd.makeCurrent(), Jd.init();
            },
            multi: !0,
          },
          {
            provide: We,
            useFactory: function () {
              return (
                (function (t) {
                  Yl = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        I2 = [
          [],
          { provide: xs, useValue: "root" },
          {
            provide: br,
            useFactory: function () {
              return new br();
            },
            deps: [],
          },
          { provide: oi, useClass: u2, multi: !0, deps: [We, Re, Oa] },
          { provide: oi, useClass: y2, multi: !0, deps: [We] },
          [],
          { provide: Xd, useClass: Xd, deps: [ul, si, Ks] },
          { provide: Da, useExisting: Xd },
          { provide: ab, useExisting: si },
          { provide: si, useClass: si, deps: [We] },
          { provide: _d, useClass: _d, deps: [Re] },
          { provide: ul, useClass: ul, deps: [oi, Re] },
          { provide: ob, useClass: zA, deps: [] },
          [],
        ];
      let S2 = (() => {
        class t {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: t,
              providers: [
                { provide: Ks, useValue: n.appId },
                { provide: sb, useExisting: Ks },
                WA,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(t, 12));
          }),
          (t.ɵmod = qn({ type: t })),
          (t.ɵinj = ln({ providers: I2, imports: [OA, yR] })),
          t
        );
      })();
      function G(...t) {
        let e = t[t.length - 1];
        return wi(e) ? (t.pop(), Al(t, e)) : Fl(t);
      }
      "undefined" != typeof window && window;
      class an extends xn {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const n = super._subscribe(e);
          return n && !n.closed && e.next(this._value), n;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new Vr();
          return this._value;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      class F2 extends ye {
        notifyNext(e, n, r, o, s) {
          this.destination.next(n);
        }
        notifyError(e, n) {
          this.destination.error(e);
        }
        notifyComplete(e) {
          this.destination.complete();
        }
      }
      class L2 extends ye {
        constructor(e, n, r) {
          super(),
            (this.parent = e),
            (this.outerValue = n),
            (this.outerIndex = r),
            (this.index = 0);
        }
        _next(e) {
          this.parent.notifyNext(
            this.outerValue,
            e,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(e) {
          this.parent.notifyError(e, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function V2(t, e, n, r, o = new L2(t, n, r)) {
        if (!o.closed) return e instanceof me ? e.subscribe(o) : Ml(e)(o);
      }
      const _b = {};
      class U2 {
        constructor(e) {
          this.resultSelector = e;
        }
        call(e, n) {
          return n.subscribe(new B2(e, this.resultSelector));
        }
      }
      class B2 extends F2 {
        constructor(e, n) {
          super(e),
            (this.resultSelector = n),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(e) {
          this.values.push(_b), this.observables.push(e);
        }
        _complete() {
          const e = this.observables,
            n = e.length;
          if (0 === n) this.destination.complete();
          else {
            (this.active = n), (this.toRespond = n);
            for (let r = 0; r < n; r++) this.add(V2(this, e[r], void 0, r));
          }
        }
        notifyComplete(e) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(e, n, r) {
          const o = this.values,
            i = this.toRespond
              ? o[r] === _b
                ? --this.toRespond
                : this.toRespond
              : 0;
          (o[r] = n),
            0 === i &&
              (this.resultSelector
                ? this._tryResultSelector(o)
                : this.destination.next(o.slice()));
        }
        _tryResultSelector(e) {
          let n;
          try {
            n = this.resultSelector.apply(this, e);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(n);
        }
      }
      const dl = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function sf(...t) {
        return Xo(1)(G(...t));
      }
      const Uo = new me((t) => t.complete());
      function af(t) {
        return t
          ? (function (t) {
              return new me((e) => t.schedule(() => e.complete()));
            })(t)
          : Uo;
      }
      function yb(t) {
        return new me((e) => {
          let n;
          try {
            n = t();
          } catch (o) {
            return void e.error(o);
          }
          return (n ? et(n) : af()).subscribe(e);
        });
      }
      function or(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(or((r, o) => et(t(r, o)).pipe(P((s, i) => e(r, s, o, i)))))
          : (n) => n.lift(new q2(t));
      }
      class q2 {
        constructor(e) {
          this.project = e;
        }
        call(e, n) {
          return n.subscribe(new W2(e, this.project));
        }
      }
      class W2 extends Nl {
        constructor(e, n) {
          super(e), (this.project = n), (this.index = 0);
        }
        _next(e) {
          let n;
          const r = this.index++;
          try {
            n = this.project(e, r);
          } catch (o) {
            return void this.destination.error(o);
          }
          this._innerSub(n);
        }
        _innerSub(e) {
          const n = this.innerSubscription;
          n && n.unsubscribe();
          const r = new kl(this),
            o = this.destination;
          o.add(r),
            (this.innerSubscription = Ol(e, r)),
            this.innerSubscription !== r && o.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: e } = this;
          (!e || e.closed) && super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
      }
      const bb = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function lf(t) {
        return (e) => (0 === t ? af() : e.lift(new z2(t)));
      }
      class z2 {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new bb();
        }
        call(e, n) {
          return n.subscribe(new G2(e, this.total));
        }
      }
      class G2 extends ye {
        constructor(e, n) {
          super(e), (this.total = n), (this.count = 0);
        }
        _next(e) {
          const n = this.total,
            r = ++this.count;
          r <= n &&
            (this.destination.next(e),
            r === n && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function vb(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (o) {
            return o.lift(new J2(t, e, n));
          }
        );
      }
      class J2 {
        constructor(e, n, r = !1) {
          (this.accumulator = e), (this.seed = n), (this.hasSeed = r);
        }
        call(e, n) {
          return n.subscribe(
            new K2(e, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class K2 extends ye {
        constructor(e, n, r, o) {
          super(e),
            (this.accumulator = n),
            (this._seed = r),
            (this.hasSeed = o),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(e) {
          (this.hasSeed = !0), (this._seed = e);
        }
        _next(e) {
          if (this.hasSeed) return this._tryNext(e);
          (this.seed = e), this.destination.next(e);
        }
        _tryNext(e) {
          const n = this.index++;
          let r;
          try {
            r = this.accumulator(this.seed, e, n);
          } catch (o) {
            this.destination.error(o);
          }
          (this.seed = r), this.destination.next(r);
        }
      }
      function Mr(t, e) {
        return function (r) {
          return r.lift(new Y2(t, e));
        };
      }
      class Y2 {
        constructor(e, n) {
          (this.predicate = e), (this.thisArg = n);
        }
        call(e, n) {
          return n.subscribe(new Z2(e, this.predicate, this.thisArg));
        }
      }
      class Z2 extends ye {
        constructor(e, n, r) {
          super(e), (this.predicate = n), (this.thisArg = r), (this.count = 0);
        }
        _next(e) {
          let n;
          try {
            n = this.predicate.call(this.thisArg, e, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          n && this.destination.next(e);
        }
      }
      function Ar(t) {
        return function (n) {
          const r = new X2(t),
            o = n.lift(r);
          return (r.caught = o);
        };
      }
      class X2 {
        constructor(e) {
          this.selector = e;
        }
        call(e, n) {
          return n.subscribe(new ek(e, this.selector, this.caught));
        }
      }
      class ek extends Nl {
        constructor(e, n, r) {
          super(e), (this.selector = n), (this.caught = r);
        }
        error(e) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(e, this.caught);
            } catch (s) {
              return void super.error(s);
            }
            this._unsubscribeAndRecycle();
            const r = new kl(this);
            this.add(r);
            const o = Ol(n, r);
            o !== r && this.add(o);
          }
        }
      }
      function Bo(t, e) {
        return ze(t, e, 1);
      }
      function uf(t) {
        return function (n) {
          return 0 === t ? af() : n.lift(new tk(t));
        };
      }
      class tk {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new bb();
        }
        call(e, n) {
          return n.subscribe(new nk(e, this.total));
        }
      }
      class nk extends ye {
        constructor(e, n) {
          super(e),
            (this.total = n),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(e) {
          const n = this.ring,
            r = this.total,
            o = this.count++;
          n.length < r ? n.push(e) : (n[o % r] = e);
        }
        _complete() {
          const e = this.destination;
          let n = this.count;
          if (n > 0) {
            const r = this.count >= this.total ? this.total : this.count,
              o = this.ring;
            for (let s = 0; s < r; s++) {
              const i = n++ % r;
              e.next(o[i]);
            }
          }
          e.complete();
        }
      }
      function Cb(t = sk) {
        return (e) => e.lift(new rk(t));
      }
      class rk {
        constructor(e) {
          this.errorFactory = e;
        }
        call(e, n) {
          return n.subscribe(new ok(e, this.errorFactory));
        }
      }
      class ok extends ye {
        constructor(e, n) {
          super(e), (this.errorFactory = n), (this.hasValue = !1);
        }
        _next(e) {
          (this.hasValue = !0), this.destination.next(e);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (n) {
              e = n;
            }
            this.destination.error(e);
          }
        }
      }
      function sk() {
        return new dl();
      }
      function wb(t = null) {
        return (e) => e.lift(new ik(t));
      }
      class ik {
        constructor(e) {
          this.defaultValue = e;
        }
        call(e, n) {
          return n.subscribe(new ak(e, this.defaultValue));
        }
      }
      class ak extends ye {
        constructor(e, n) {
          super(e), (this.defaultValue = n), (this.isEmpty = !0);
        }
        _next(e) {
          (this.isEmpty = !1), this.destination.next(e);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function Ho(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Mr((o, s) => t(o, s, r)) : Ci,
            lf(1),
            n ? wb(e) : Cb(() => new dl())
          );
      }
      function sr() {}
      function xt(t, e, n) {
        return function (o) {
          return o.lift(new uk(t, e, n));
        };
      }
      class uk {
        constructor(e, n, r) {
          (this.nextOrObserver = e), (this.error = n), (this.complete = r);
        }
        call(e, n) {
          return n.subscribe(
            new ck(e, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class ck extends ye {
        constructor(e, n, r, o) {
          super(e),
            (this._tapNext = sr),
            (this._tapError = sr),
            (this._tapComplete = sr),
            (this._tapError = r || sr),
            (this._tapComplete = o || sr),
            En(n)
              ? ((this._context = this), (this._tapNext = n))
              : n &&
                ((this._context = n),
                (this._tapNext = n.next || sr),
                (this._tapError = n.error || sr),
                (this._tapComplete = n.complete || sr));
        }
        _next(e) {
          try {
            this._tapNext.call(this._context, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
        _error(e) {
          try {
            this._tapError.call(this._context, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.error(e);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (e) {
            return void this.destination.error(e);
          }
          return this.destination.complete();
        }
      }
      class fk {
        constructor(e) {
          this.callback = e;
        }
        call(e, n) {
          return n.subscribe(new pk(e, this.callback));
        }
      }
      class pk extends ye {
        constructor(e, n) {
          super(e), this.add(new De(n));
        }
      }
      class Vn {
        constructor(e, n) {
          (this.id = e), (this.url = n);
        }
      }
      class cf extends Vn {
        constructor(e, n, r = "imperative", o = null) {
          super(e, n), (this.navigationTrigger = r), (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ii extends Vn {
        constructor(e, n, r) {
          super(e, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Db extends Vn {
        constructor(e, n, r) {
          super(e, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class hk extends Vn {
        constructor(e, n, r) {
          super(e, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class gk extends Vn {
        constructor(e, n, r, o) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mk extends Vn {
        constructor(e, n, r, o) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _k extends Vn {
        constructor(e, n, r, o, s) {
          super(e, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class yk extends Vn {
        constructor(e, n, r, o) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class bk extends Vn {
        constructor(e, n, r, o) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Eb {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class xb {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class vk {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ck {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class wk {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Dk {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Tb {
        constructor(e, n, r) {
          (this.routerEvent = e), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const X = "primary";
      class Ek {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
          if (this.has(e)) {
            const n = this.params[e];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const n = this.params[e];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function $o(t) {
        return new Ek(t);
      }
      const Ib = "ngNavigationCancelingError";
      function df(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e[Ib] = !0), e;
      }
      function Tk(t, e, n) {
        const r = n.path.split("/");
        if (
          r.length > t.length ||
          ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
        )
          return null;
        const o = {};
        for (let s = 0; s < r.length; s++) {
          const i = r[s],
            a = t[s];
          if (i.startsWith(":")) o[i.substring(1)] = a;
          else if (i !== a.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: o };
      }
      function wn(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let s = 0; s < n.length; s++)
          if (((o = n[s]), !Sb(t[o], e[o]))) return !1;
        return !0;
      }
      function Sb(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((o, s) => r[s] === o);
        }
        return t === e;
      }
      function Pb(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Rb(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Ge(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Dn(t) {
        return wc(t) ? t : ga(t) ? et(Promise.resolve(t)) : G(t);
      }
      const Pk = {
          exact: function kb(t, e, n) {
            if (
              !Nr(t.segments, e.segments) ||
              !fl(t.segments, e.segments, n) ||
              t.numberOfChildren !== e.numberOfChildren
            )
              return !1;
            for (const r in e.children)
              if (!t.children[r] || !kb(t.children[r], e.children[r], n))
                return !1;
            return !0;
          },
          subset: Nb,
        },
        Mb = {
          exact: function (t, e) {
            return wn(t, e);
          },
          subset: function (t, e) {
            return (
              Object.keys(e).length <= Object.keys(t).length &&
              Object.keys(e).every((n) => Sb(t[n], e[n]))
            );
          },
          ignored: () => !0,
        };
      function Ab(t, e, n) {
        return (
          Pk[n.paths](t.root, e.root, n.matrixParams) &&
          Mb[n.queryParams](t.queryParams, e.queryParams) &&
          !("exact" === n.fragment && t.fragment !== e.fragment)
        );
      }
      function Nb(t, e, n) {
        return Ob(t, e, e.segments, n);
      }
      function Ob(t, e, n, r) {
        if (t.segments.length > n.length) {
          const o = t.segments.slice(0, n.length);
          return !(!Nr(o, n) || e.hasChildren() || !fl(o, n, r));
        }
        if (t.segments.length === n.length) {
          if (!Nr(t.segments, n) || !fl(t.segments, n, r)) return !1;
          for (const o in e.children)
            if (!t.children[o] || !Nb(t.children[o], e.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, t.segments.length),
            s = n.slice(t.segments.length);
          return (
            !!(Nr(t.segments, o) && fl(t.segments, o, r) && t.children[X]) &&
            Ob(t.children[X], e, s, r)
          );
        }
      }
      function fl(t, e, n) {
        return e.every((r, o) => Mb[n](t[o].parameters, r.parameters));
      }
      class kr {
        constructor(e, n, r) {
          (this.root = e), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = $o(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Nk.serialize(this);
        }
      }
      class te {
        constructor(e, n) {
          (this.segments = e),
            (this.children = n),
            (this.parent = null),
            Ge(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return pl(this);
        }
      }
      class ai {
        constructor(e, n) {
          (this.path = e), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = $o(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return jb(this);
        }
      }
      function Nr(t, e) {
        return t.length === e.length && t.every((n, r) => n.path === e[r].path);
      }
      class ff {}
      class Fb {
        parse(e) {
          const n = new $k(e);
          return new kr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(e) {
          return `${`/${li(e.root, !0)}`}${(function (t) {
            const e = Object.keys(t)
              .map((n) => {
                const r = t[n];
                return Array.isArray(r)
                  ? r.map((o) => `${hl(n)}=${hl(o)}`).join("&")
                  : `${hl(n)}=${hl(r)}`;
              })
              .filter((n) => !!n);
            return e.length ? `?${e.join("&")}` : "";
          })(e.queryParams)}${
            "string" == typeof e.fragment
              ? `#${(function (t) {
                  return encodeURI(t);
                })(e.fragment)}`
              : ""
          }`;
        }
      }
      const Nk = new Fb();
      function pl(t) {
        return t.segments.map((e) => jb(e)).join("/");
      }
      function li(t, e) {
        if (!t.hasChildren()) return pl(t);
        if (e) {
          const n = t.children[X] ? li(t.children[X], !1) : "",
            r = [];
          return (
            Ge(t.children, (o, s) => {
              s !== X && r.push(`${s}:${li(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function (t, e) {
            let n = [];
            return (
              Ge(t.children, (r, o) => {
                o === X && (n = n.concat(e(r, o)));
              }),
              Ge(t.children, (r, o) => {
                o !== X && (n = n.concat(e(r, o)));
              }),
              n
            );
          })(t, (r, o) =>
            o === X ? [li(t.children[X], !1)] : [`${o}:${li(r, !1)}`]
          );
          return 1 === Object.keys(t.children).length && null != t.children[X]
            ? `${pl(t)}/${n[0]}`
            : `${pl(t)}/(${n.join("//")})`;
        }
      }
      function Lb(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function hl(t) {
        return Lb(t).replace(/%3B/gi, ";");
      }
      function pf(t) {
        return Lb(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function gl(t) {
        return decodeURIComponent(t);
      }
      function Vb(t) {
        return gl(t.replace(/\+/g, "%20"));
      }
      function jb(t) {
        return `${pf(t.path)}${(function (t) {
          return Object.keys(t)
            .map((e) => `;${pf(e)}=${pf(t[e])}`)
            .join("");
        })(t.parameters)}`;
      }
      const Vk = /^[^\/()?;=#]+/;
      function ml(t) {
        const e = t.match(Vk);
        return e ? e[0] : "";
      }
      const jk = /^[^=?&#]+/,
        Bk = /^[^?&#]+/;
      class $k {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new te([], {})
              : new te([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (e.length > 0 || Object.keys(n).length > 0) &&
              (r[X] = new te(e, n)),
            r
          );
        }
        parseSegment() {
          const e = ml(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new ai(gl(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const n = ml(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = ml(this.remaining);
            o && ((r = o), this.capture(r));
          }
          e[gl(n)] = gl(r);
        }
        parseQueryParam(e) {
          const n = (function (t) {
            const e = t.match(jk);
            return e ? e[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = (function (t) {
              const e = t.match(Bk);
              return e ? e[0] : "";
            })(this.remaining);
            i && ((r = i), this.capture(r));
          }
          const o = Vb(n),
            s = Vb(r);
          if (e.hasOwnProperty(o)) {
            let i = e[o];
            Array.isArray(i) || ((i = [i]), (e[o] = i)), i.push(s);
          } else e[o] = s;
        }
        parseParens(e) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ml(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            r.indexOf(":") > -1
              ? ((s = r.substr(0, r.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : e && (s = X);
            const i = this.parseChildren();
            (n[s] = 1 === Object.keys(i).length ? i[X] : new te([], i)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class Ub {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const n = this.pathFromRoot(e);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(e) {
          const n = hf(e, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(e) {
          const n = hf(e, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(e) {
          const n = gf(e, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== e);
        }
        pathFromRoot(e) {
          return gf(e, this._root).map((n) => n.value);
        }
      }
      function hf(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const r = hf(t, n);
          if (r) return r;
        }
        return null;
      }
      function gf(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = gf(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class jn {
        constructor(e, n) {
          (this.value = e), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ui(t) {
        const e = {};
        return t && t.children.forEach((n) => (e[n.value.outlet] = n)), e;
      }
      class Bb extends Ub {
        constructor(e, n) {
          super(e), (this.snapshot = n), mf(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Hb(t, e) {
        const n = (function (t, e) {
            const i = new _l([], {}, {}, "", {}, X, e, null, t.root, -1, {});
            return new qb("", new jn(i, []));
          })(t, e),
          r = new an([new ai("", {})]),
          o = new an({}),
          s = new an({}),
          i = new an({}),
          a = new an(""),
          l = new qo(r, o, i, a, s, X, e, n.root);
        return (l.snapshot = n.root), new Bb(new jn(l, []), n);
      }
      class qo {
        constructor(e, n, r, o, s, i, a, l) {
          (this.url = e),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = s),
            (this.outlet = i),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(P((e) => $o(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(P((e) => $o(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function $b(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              s = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (s.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (e, n) => ({
              params: Object.assign(Object.assign({}, e.params), n.params),
              data: Object.assign(Object.assign({}, e.data), n.data),
              resolve: Object.assign(
                Object.assign({}, e.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class _l {
        constructor(e, n, r, o, s, i, a, l, d, f, p) {
          (this.url = e),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = s),
            (this.outlet = i),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = d),
            (this._lastPathIndex = f),
            (this._resolve = p);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = $o(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = $o(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class qb extends Ub {
        constructor(e, n) {
          super(n), (this.url = e), mf(this, n);
        }
        toString() {
          return Wb(this._root);
        }
      }
      function mf(t, e) {
        (e.value._routerState = t), e.children.forEach((n) => mf(t, n));
      }
      function Wb(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(Wb).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function _f(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            wn(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            wn(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!wn(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            wn(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function yf(t, e) {
        return (
          wn(t.params, e.params) &&
          (function (t, e) {
            return (
              Nr(t, e) && t.every((n, r) => wn(n.parameters, e[r].parameters))
            );
          })(t.url, e.url) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || yf(t.parent, e.parent))
        );
      }
      function yl(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const o = (function (t, e, n) {
            return e.children.map((r) => {
              for (const o of n.children)
                if (t.shouldReuseRoute(r.value, o.value.snapshot))
                  return yl(t, r, o);
              return yl(t, r);
            });
          })(t, e, n);
          return new jn(r, o);
        }
        {
          if (t.shouldAttach(e.value)) {
            const s = t.retrieve(e.value);
            if (null !== s) {
              const i = s.route;
              return zb(e, i), i;
            }
          }
          const r = (function (t) {
              return new qo(
                new an(t.url),
                new an(t.params),
                new an(t.queryParams),
                new an(t.fragment),
                new an(t.data),
                t.outlet,
                t.component,
                t
              );
            })(e.value),
            o = e.children.map((s) => yl(t, s));
          return new jn(r, o);
        }
      }
      function zb(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot created from a different route"
          );
        if (t.children.length !== e.children.length)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot with a different number of children"
          );
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n)
          zb(t.children[n], e.children[n]);
      }
      function bl(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function ci(t) {
        return "object" == typeof t && null != t && t.outlets;
      }
      function bf(t, e, n, r, o) {
        let s = {};
        return (
          r &&
            Ge(r, (i, a) => {
              s[a] = Array.isArray(i) ? i.map((l) => `${l}`) : `${i}`;
            }),
          new kr(n.root === t ? e : Gb(n.root, t, e), s, o)
        );
      }
      function Gb(t, e, n) {
        const r = {};
        return (
          Ge(t.children, (o, s) => {
            r[s] = o === e ? n : Gb(o, e, n);
          }),
          new te(t.segments, r)
        );
      }
      class Qb {
        constructor(e, n, r) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            e && r.length > 0 && bl(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const o = r.find(ci);
          if (o && o !== Rb(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class vf {
        constructor(e, n, r) {
          (this.segmentGroup = e), (this.processChildren = n), (this.index = r);
        }
      }
      function Jb(t, e, n) {
        if (
          (t || (t = new te([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return vl(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              o = e;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < t.segments.length; ) {
              if (r >= n.length) return s;
              const i = t.segments[o],
                a = n[r];
              if (ci(a)) break;
              const l = `${a}`,
                d = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && d && "object" == typeof d && void 0 === d.outlets) {
                if (!Yb(l, d, i)) return s;
                r += 2;
              } else {
                if (!Yb(l, {}, i)) return s;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(t, e, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const s = new te(t.segments.slice(0, r.pathIndex), {});
          return (
            (s.children[X] = new te(t.segments.slice(r.pathIndex), t.children)),
            vl(s, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new te(t.segments, {})
          : r.match && !t.hasChildren()
          ? Cf(t, e, n)
          : r.match
          ? vl(t, 0, o)
          : Cf(t, e, n);
      }
      function vl(t, e, n) {
        if (0 === n.length) return new te(t.segments, {});
        {
          const r = (function (t) {
              return ci(t[0]) ? t[0].outlets : { [X]: t };
            })(n),
            o = {};
          return (
            Ge(r, (s, i) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = Jb(t.children[i], e, s));
            }),
            Ge(t.children, (s, i) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new te(t.segments, o)
          );
        }
      }
      function Cf(t, e, n) {
        const r = t.segments.slice(0, e);
        let o = 0;
        for (; o < n.length; ) {
          const s = n[o];
          if (ci(s)) {
            const l = tN(s.outlets);
            return new te(r, l);
          }
          if (0 === o && bl(n[0])) {
            r.push(new ai(t.segments[e].path, Kb(n[0]))), o++;
            continue;
          }
          const i = ci(s) ? s.outlets[X] : `${s}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          i && a && bl(a)
            ? (r.push(new ai(i, Kb(a))), (o += 2))
            : (r.push(new ai(i, {})), o++);
        }
        return new te(r, {});
      }
      function tN(t) {
        const e = {};
        return (
          Ge(t, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (e[r] = Cf(new te([], {}), 0, n));
          }),
          e
        );
      }
      function Kb(t) {
        const e = {};
        return Ge(t, (n, r) => (e[r] = `${n}`)), e;
      }
      function Yb(t, e, n) {
        return t == n.path && wn(e, n.parameters);
      }
      class rN {
        constructor(e, n, r, o) {
          (this.routeReuseStrategy = e),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(e) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, e),
            _f(this.futureState.root),
            this.activateChildRoutes(n, r, e);
        }
        deactivateChildRoutes(e, n, r) {
          const o = ui(n);
          e.children.forEach((s) => {
            const i = s.value.outlet;
            this.deactivateRoutes(s, o[i], r), delete o[i];
          }),
            Ge(o, (s, i) => {
              this.deactivateRouteAndItsChildren(s, r);
            });
        }
        deactivateRoutes(e, n, r) {
          const o = e.value,
            s = n ? n.value : null;
          if (o === s)
            if (o.component) {
              const i = r.getContext(o.outlet);
              i && this.deactivateChildRoutes(e, n, i.children);
            } else this.deactivateChildRoutes(e, n, r);
          else s && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(e, n) {
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, n)
            : this.deactivateRouteAndOutlet(e, n);
        }
        detachAndStoreRouteSubtree(e, n) {
          const r = n.getContext(e.value.outlet);
          if (r && r.outlet) {
            const o = r.outlet.detach(),
              s = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: o,
              route: e,
              contexts: s,
            });
          }
        }
        deactivateRouteAndOutlet(e, n) {
          const r = n.getContext(e.value.outlet),
            o = r && e.value.component ? r.children : n,
            s = ui(e);
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(e, n, r) {
          const o = ui(n);
          e.children.forEach((s) => {
            this.activateRoutes(s, o[s.value.outlet], r),
              this.forwardEvent(new Dk(s.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new Ck(e.value.snapshot));
        }
        activateRoutes(e, n, r) {
          const o = e.value,
            s = n ? n.value : null;
          if ((_f(o), o === s))
            if (o.component) {
              const i = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(e, n, i.children);
            } else this.activateChildRoutes(e, n, r);
          else if (o.component) {
            const i = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                i.children.onOutletReAttached(a.contexts),
                (i.attachRef = a.componentRef),
                (i.route = a.route.value),
                i.outlet && i.outlet.attach(a.componentRef, a.route.value),
                Zb(a.route);
            } else {
              const a = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const n = e.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(o.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (i.attachRef = null),
                (i.route = o),
                (i.resolver = l),
                i.outlet && i.outlet.activateWith(o, l),
                this.activateChildRoutes(e, null, i.children);
            }
          } else this.activateChildRoutes(e, null, r);
        }
      }
      function Zb(t) {
        _f(t.value), t.children.forEach(Zb);
      }
      class wf {
        constructor(e, n) {
          (this.routes = e), (this.module = n);
        }
      }
      function ir(t) {
        return "function" == typeof t;
      }
      function Or(t) {
        return t instanceof kr;
      }
      const di = Symbol("INITIAL_VALUE");
      function fi() {
        return or((t) =>
          (function (...t) {
            let e, n;
            return (
              wi(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && qf(t[0]) && (t = t[0]),
              Fl(t, n).lift(new U2(e))
            );
          })(
            t.map((e) =>
              e.pipe(
                lf(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return wi(e)
                    ? (t.pop(), (n) => sf(t, n, e))
                    : (n) => sf(t, n);
                })(di)
              )
            )
          ).pipe(
            vb((e, n) => {
              let r = !1;
              return n.reduce(
                (o, s, i) =>
                  o !== di
                    ? o
                    : (s === di && (r = !0),
                      r || (!1 !== s && i !== n.length - 1 && !Or(s)) ? o : s),
                e
              );
            }, di),
            Mr((e) => e !== di),
            P((e) => (Or(e) ? e : !0 === e)),
            lf(1)
          )
        );
      }
      let Xb = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && I(0, "router-outlet");
            },
            directives: function () {
              return [Sf];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function ev(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          cN(r, dN(e, r));
        }
      }
      function cN(t, e) {
        t.children && ev(t.children, e);
      }
      function dN(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function Df(t) {
        const e = t.children && t.children.map(Df),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== X &&
            (n.component = Xb),
          n
        );
      }
      function Ut(t) {
        return t.outlet || X;
      }
      function tv(t, e) {
        const n = t.filter((r) => Ut(r) === e);
        return n.push(...t.filter((r) => Ut(r) !== e)), n;
      }
      const nv = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function Cl(t, e, n) {
        var r;
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, nv)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const s = (e.matcher || Tk)(n, t, e);
        if (!s) return Object.assign({}, nv);
        const i = {};
        Ge(s.posParams, (l, d) => {
          i[d] = l.path;
        });
        const a =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, i),
                s.consumed[s.consumed.length - 1].parameters
              )
            : i;
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = s.posParams) && void 0 !== r ? r : {},
        };
      }
      function wl(t, e, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((r) => Dl(t, e, r) && Ut(r) !== X);
          })(t, n, r)
        ) {
          const i = new te(
            e,
            (function (t, e, n, r) {
              const o = {};
              (o[X] = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const s of n)
                if ("" === s.path && Ut(s) !== X) {
                  const i = new te([], {});
                  (i._sourceSegment = t),
                    (i._segmentIndexShift = e.length),
                    (o[Ut(s)] = i);
                }
              return o;
            })(t, e, r, new te(n, t.children))
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((r) => Dl(t, e, r));
          })(t, n, r)
        ) {
          const i = new te(
            t.segments,
            (function (t, e, n, r, o, s) {
              const i = {};
              for (const a of r)
                if (Dl(t, n, a) && !o[Ut(a)]) {
                  const l = new te([], {});
                  (l._sourceSegment = t),
                    (l._segmentIndexShift =
                      "legacy" === s ? t.segments.length : e.length),
                    (i[Ut(a)] = l);
                }
              return Object.assign(Object.assign({}, o), i);
            })(t, e, n, r, t.children, o)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const s = new te(t.segments, t.children);
        return (
          (s._sourceSegment = t),
          (s._segmentIndexShift = e.length),
          { segmentGroup: s, slicedSegments: n }
        );
      }
      function Dl(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function rv(t, e, n, r) {
        return (
          !!(Ut(t) === r || (r !== X && Dl(e, n, t))) &&
          ("**" === t.path || Cl(e, t, n).matched)
        );
      }
      function ov(t, e, n) {
        return 0 === e.length && !t.children[n];
      }
      class pi {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class sv {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function El(t) {
        return new me((e) => e.error(new pi(t)));
      }
      function iv(t) {
        return new me((e) => e.error(new sv(t)));
      }
      function mN(t) {
        return new me((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class bN {
        constructor(e, n, r, o, s) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(Cn));
        }
        apply() {
          const e = wl(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new te(e.segments, e.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, X)
            .pipe(
              P((s) =>
                this.createUrlTree(
                  Ef(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Ar((s) => {
                if (s instanceof sv)
                  return (this.allowRedirects = !1), this.match(s.urlTree);
                throw s instanceof pi ? this.noMatchError(s) : s;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(this.ngModule, this.config, e.root, X)
            .pipe(
              P((o) => this.createUrlTree(Ef(o), e.queryParams, e.fragment))
            )
            .pipe(
              Ar((o) => {
                throw o instanceof pi ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, n, r) {
          const o = e.segments.length > 0 ? new te([], { [X]: e }) : e;
          return new kr(o, n, r);
        }
        expandSegmentGroup(e, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(e, n, r).pipe(P((s) => new te([], s)))
            : this.expandSegment(e, r, n, r.segments, o, !0);
        }
        expandChildren(e, n, r) {
          const o = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? o.unshift(s) : o.push(s);
          return et(o).pipe(
            Bo((s) => {
              const i = r.children[s],
                a = tv(n, s);
              return this.expandSegmentGroup(e, a, i, s).pipe(
                P((l) => ({ segment: l, outlet: s }))
              );
            }),
            vb((s, i) => ((s[i.outlet] = i.segment), s), {}),
            (function (t, e) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  t ? Mr((o, s) => t(o, s, r)) : Ci,
                  uf(1),
                  n ? wb(e) : Cb(() => new dl())
                );
            })()
          );
        }
        expandSegment(e, n, r, o, s, i) {
          return et(r).pipe(
            Bo((a) =>
              this.expandSegmentAgainstRoute(e, n, r, a, o, s, i).pipe(
                Ar((d) => {
                  if (d instanceof pi) return G(null);
                  throw d;
                })
              )
            ),
            Ho((a) => !!a),
            Ar((a, l) => {
              if (a instanceof dl || "EmptyError" === a.name) {
                if (ov(n, o, s)) return G(new te([], {}));
                throw new pi(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(e, n, r, o, s, i, a) {
          return rv(o, n, s, i)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(e, n, o, s, i)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, n, r, o, s, i)
              : El(n)
            : El(n);
        }
        expandSegmentAgainstRouteUsingRedirect(e, n, r, o, s, i) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, o, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                n,
                r,
                o,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, o) {
          const s = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? iv(s)
            : this.lineralizeSegments(r, s).pipe(
                ze((i) => {
                  const a = new te(i, {});
                  return this.expandSegment(e, a, n, i, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, n, r, o, s, i) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: d,
            positionalParamSegments: f,
          } = Cl(n, o, s);
          if (!a) return El(n);
          const p = this.applyRedirectCommands(l, o.redirectTo, f);
          return o.redirectTo.startsWith("/")
            ? iv(p)
            : this.lineralizeSegments(o, p).pipe(
                ze((h) =>
                  this.expandSegment(e, n, r, h.concat(s.slice(d)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(e, n, r, o, s) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? G(r._loadedConfig)
                  : this.configLoader.load(e.injector, r)
                ).pipe(P((h) => ((r._loadedConfig = h), new te(o, {}))))
              : G(new te(o, {}));
          const { matched: i, consumedSegments: a, lastChild: l } = Cl(n, r, o);
          if (!i) return El(n);
          const d = o.slice(l);
          return this.getChildConfig(e, r, o).pipe(
            ze((p) => {
              const h = p.module,
                m = p.routes,
                { segmentGroup: _, slicedSegments: v } = wl(n, a, d, m),
                b = new te(_.segments, _.children);
              if (0 === v.length && b.hasChildren())
                return this.expandChildren(h, m, b).pipe(
                  P((k) => new te(a, k))
                );
              if (0 === m.length && 0 === v.length) return G(new te(a, {}));
              const w = Ut(r) === s;
              return this.expandSegment(h, b, m, v, w ? X : s, !0).pipe(
                P((M) => new te(a.concat(M.segments), M.children))
              );
            })
          );
        }
        getChildConfig(e, n, r) {
          return n.children
            ? G(new wf(n.children, e))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? G(n._loadedConfig)
              : this.runCanLoadGuards(e.injector, n, r).pipe(
                  ze((o) =>
                    o
                      ? this.configLoader
                          .load(e.injector, n)
                          .pipe(P((s) => ((n._loadedConfig = s), s)))
                      : (function (t) {
                          return new me((e) =>
                            e.error(
                              df(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : G(new wf([], e));
        }
        runCanLoadGuards(e, n, r) {
          const o = n.canLoad;
          return o && 0 !== o.length
            ? G(
                o.map((i) => {
                  const a = e.get(i);
                  let l;
                  if (
                    (function (t) {
                      return t && ir(t.canLoad);
                    })(a)
                  )
                    l = a.canLoad(n, r);
                  else {
                    if (!ir(a)) throw new Error("Invalid CanLoad guard");
                    l = a(n, r);
                  }
                  return Dn(l);
                })
              ).pipe(
                fi(),
                xt((i) => {
                  if (!Or(i)) return;
                  const a = df(
                    `Redirecting to "${this.urlSerializer.serialize(i)}"`
                  );
                  throw ((a.url = i), a);
                }),
                P((i) => !0 === i)
              )
            : G(!0);
        }
        lineralizeSegments(e, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return G(r);
            if (o.numberOfChildren > 1 || !o.children[X])
              return mN(e.redirectTo);
            o = o.children[X];
          }
        }
        applyRedirectCommands(e, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            e,
            r
          );
        }
        applyRedirectCreatreUrlTree(e, n, r, o) {
          const s = this.createSegmentGroup(e, n.root, r, o);
          return new kr(
            s,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(e, n) {
          const r = {};
          return (
            Ge(e, (o, s) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[s] = n[a];
              } else r[s] = o;
            }),
            r
          );
        }
        createSegmentGroup(e, n, r, o) {
          const s = this.createSegments(e, n.segments, r, o);
          let i = {};
          return (
            Ge(n.children, (a, l) => {
              i[l] = this.createSegmentGroup(e, a, r, o);
            }),
            new te(s, i)
          );
        }
        createSegments(e, n, r, o) {
          return n.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(e, s, o)
              : this.findOrReturn(s, r)
          );
        }
        findPosParam(e, n, r) {
          const o = r[n.path.substring(1)];
          if (!o)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${n.path}'.`
            );
          return o;
        }
        findOrReturn(e, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === e.path) return n.splice(r), o;
            r++;
          }
          return e;
        }
      }
      function Ef(t) {
        const e = {};
        for (const r of Object.keys(t.children)) {
          const s = Ef(t.children[r]);
          (s.segments.length > 0 || s.hasChildren()) && (e[r] = s);
        }
        return (function (t) {
          if (1 === t.numberOfChildren && t.children[X]) {
            const e = t.children[X];
            return new te(t.segments.concat(e.segments), e.children);
          }
          return t;
        })(new te(t.segments, e));
      }
      class av {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class xl {
        constructor(e, n) {
          (this.component = e), (this.route = n);
        }
      }
      function wN(t, e, n) {
        const r = t._root;
        return hi(r, e ? e._root : null, n, [r.value]);
      }
      function Tl(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const n = e.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function hi(
        t,
        e,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = ui(e);
        return (
          t.children.forEach((i) => {
            (function (
              t,
              e,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = t.value,
                i = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (i && s.routeConfig === i.routeConfig) {
                const l = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !Nr(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Nr(t.url, e.url) || !wn(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !yf(t, e) || !wn(t.queryParams, e.queryParams);
                    case "paramsChange":
                    default:
                      return !yf(t, e);
                  }
                })(i, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new av(r))
                  : ((s.data = i.data), (s._resolvedData = i._resolvedData)),
                  hi(t, e, s.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new xl(a.outlet.component, i));
              } else
                i && gi(e, a, o),
                  o.canActivateChecks.push(new av(r)),
                  hi(t, null, s.component ? (a ? a.children : null) : n, r, o);
            })(i, s[i.value.outlet], n, r.concat([i.value]), o),
              delete s[i.value.outlet];
          }),
          Ge(s, (i, a) => gi(i, n.getContext(a), o)),
          o
        );
      }
      function gi(t, e, n) {
        const r = ui(t),
          o = t.value;
        Ge(r, (s, i) => {
          gi(s, o.component ? (e ? e.children.getContext(i) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new xl(
              o.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              o
            )
          );
      }
      class ON {}
      function lv(t) {
        return new me((e) => e.error(t));
      }
      class LN {
        constructor(e, n, r, o, s, i) {
          (this.rootComponentType = e),
            (this.config = n),
            (this.urlTree = r),
            (this.url = o),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          const e = wl(
              this.urlTree.root,
              [],
              [],
              this.config.filter((i) => void 0 === i.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, e, X);
          if (null === n) return null;
          const r = new _l(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              X,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            o = new jn(r, n),
            s = new qb(this.url, o);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(e) {
          const n = e.value,
            r = $b(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            e.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(e, n)
            : this.processSegment(e, n, n.segments, r);
        }
        processChildren(e, n) {
          const r = [];
          for (const s of Object.keys(n.children)) {
            const i = n.children[s],
              a = tv(e, s),
              l = this.processSegmentGroup(a, i, s);
            if (null === l) return null;
            r.push(...l);
          }
          const o = uv(r);
          return (
            (function (t) {
              t.sort((e, n) =>
                e.value.outlet === X
                  ? -1
                  : n.value.outlet === X
                  ? 1
                  : e.value.outlet.localeCompare(n.value.outlet)
              );
            })(o),
            o
          );
        }
        processSegment(e, n, r, o) {
          for (const s of e) {
            const i = this.processSegmentAgainstRoute(s, n, r, o);
            if (null !== i) return i;
          }
          return ov(n, r, o) ? [] : null;
        }
        processSegmentAgainstRoute(e, n, r, o) {
          if (e.redirectTo || !rv(e, n, r, o)) return null;
          let s,
            i = [],
            a = [];
          if ("**" === e.path) {
            const m = r.length > 0 ? Rb(r).parameters : {};
            s = new _l(
              r,
              m,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              fv(e),
              Ut(e),
              e.component,
              e,
              cv(n),
              dv(n) + r.length,
              pv(e)
            );
          } else {
            const m = Cl(n, e, r);
            if (!m.matched) return null;
            (i = m.consumedSegments),
              (a = r.slice(m.lastChild)),
              (s = new _l(
                i,
                m.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                fv(e),
                Ut(e),
                e.component,
                e,
                cv(n),
                dv(n) + i.length,
                pv(e)
              ));
          }
          const l = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: d, slicedSegments: f } = wl(
              n,
              i,
              a,
              l.filter((m) => void 0 === m.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === f.length && d.hasChildren()) {
            const m = this.processChildren(l, d);
            return null === m ? null : [new jn(s, m)];
          }
          if (0 === l.length && 0 === f.length) return [new jn(s, [])];
          const p = Ut(e) === o,
            h = this.processSegment(l, d, f, p ? X : o);
          return null === h ? null : [new jn(s, h)];
        }
      }
      function UN(t) {
        const e = t.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function uv(t) {
        const e = [],
          n = new Set();
        for (const r of t) {
          if (!UN(r)) {
            e.push(r);
            continue;
          }
          const o = e.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : e.push(r);
        }
        for (const r of n) {
          const o = uv(r.children);
          e.push(new jn(r.value, o));
        }
        return e.filter((r) => !n.has(r));
      }
      function cv(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function dv(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function fv(t) {
        return t.data || {};
      }
      function pv(t) {
        return t.resolve || {};
      }
      function xf(t) {
        return or((e) => {
          const n = t(e);
          return n ? et(n).pipe(P(() => e)) : G(e);
        });
      }
      class QN extends class {
        shouldDetach(e) {
          return !1;
        }
        store(e, n) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, n) {
          return e.routeConfig === n.routeConfig;
        }
      } {}
      const Tf = new ne("ROUTES");
      class hv {
        constructor(e, n, r, o) {
          (this.loader = e),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = o);
        }
        load(e, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const o = this.loadModuleFactory(n.loadChildren).pipe(
            P((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const i = s.create(e);
              return new wf(
                Pb(i.injector.get(Tf, void 0, L.Self | L.Optional)).map(Df),
                i
              );
            }),
            Ar((s) => {
              throw ((n._loader$ = void 0), s);
            })
          );
          return (
            (n._loader$ = new tp(o, () => new xn()).pipe(Ll())), n._loader$
          );
        }
        loadModuleFactory(e) {
          return "string" == typeof e
            ? et(this.loader.load(e))
            : Dn(e()).pipe(
                ze((n) =>
                  n instanceof z_
                    ? G(n)
                    : et(this.compiler.compileModuleAsync(n))
                )
              );
        }
      }
      class JN {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Wo()),
            (this.attachRef = null);
        }
      }
      class Wo {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(e, n) {
          const r = this.getOrCreateContext(e);
          (r.outlet = n), this.contexts.set(e, r);
        }
        onChildOutletDestroyed(e) {
          const n = this.getContext(e);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let n = this.getContext(e);
          return n || ((n = new JN()), this.contexts.set(e, n)), n;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      class YN {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, n) {
          return e;
        }
      }
      function ZN(t) {
        throw t;
      }
      function XN(t, e, n) {
        return e.parse("/");
      }
      function gv(t, e) {
        return G(null);
      }
      const eO = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        tO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let ce = (() => {
        class t {
          constructor(n, r, o, s, i, a, l, d) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = s),
              (this.config = d),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.lastLocationChangeInfo = null),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new xn()),
              (this.errorHandler = ZN),
              (this.malformedUriErrorHandler = XN),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: gv,
                afterPreactivation: gv,
              }),
              (this.urlHandlingStrategy = new YN()),
              (this.routeReuseStrategy = new QN()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = i.get(Cn)),
              (this.console = i.get(Fa));
            const h = i.get(Re);
            (this.isNgZoneEnabled = h instanceof Re && Re.isInAngularZone()),
              this.resetConfig(d),
              (this.currentUrlTree = new kr(new te([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new hv(
                a,
                l,
                (m) => this.triggerEvent(new Eb(m)),
                (m) => this.triggerEvent(new xb(m))
              )),
              (this.routerState = Hb(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new an({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var n;
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Mr((o) => 0 !== o.id),
              P((o) =>
                Object.assign(Object.assign({}, o), {
                  extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
                })
              ),
              or((o) => {
                let s = !1,
                  i = !1;
                return G(o).pipe(
                  xt((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  or((a) => {
                    const l = this.browserUrlTree.toString(),
                      d =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || d) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Il(a.source) && (this.browserUrlTree = a.extractedUrl),
                        G(a).pipe(
                          or((p) => {
                            const h = this.transitions.getValue();
                            return (
                              r.next(
                                new cf(
                                  p.id,
                                  this.serializeUrl(p.extractedUrl),
                                  p.source,
                                  p.restoredState
                                )
                              ),
                              h !== this.transitions.getValue()
                                ? Uo
                                : Promise.resolve(p)
                            );
                          }),
                          (function (t, e, n, r) {
                            return or((o) =>
                              (function (t, e, n, r, o) {
                                return new bN(t, e, n, r, o).apply();
                              })(t, e, n, o.extractedUrl, r).pipe(
                                P((s) =>
                                  Object.assign(Object.assign({}, o), {
                                    urlAfterRedirects: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          xt((p) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: p.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, o) {
                            return ze((s) =>
                              (function (
                                t,
                                e,
                                n,
                                r,
                                o = "emptyOnly",
                                s = "legacy"
                              ) {
                                try {
                                  const i = new LN(
                                    t,
                                    e,
                                    n,
                                    r,
                                    o,
                                    s
                                  ).recognize();
                                  return null === i ? lv(new ON()) : G(i);
                                } catch (i) {
                                  return lv(i);
                                }
                              })(
                                t,
                                e,
                                s.urlAfterRedirects,
                                n(s.urlAfterRedirects),
                                r,
                                o
                              ).pipe(
                                P((i) =>
                                  Object.assign(Object.assign({}, s), {
                                    targetSnapshot: i,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (p) => this.serializeUrl(p),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          xt((p) => {
                            "eager" === this.urlUpdateStrategy &&
                              (p.extras.skipLocationChange ||
                                this.setBrowserUrl(p.urlAfterRedirects, p),
                              (this.browserUrlTree = p.urlAfterRedirects));
                            const h = new gk(
                              p.id,
                              this.serializeUrl(p.extractedUrl),
                              this.serializeUrl(p.urlAfterRedirects),
                              p.targetSnapshot
                            );
                            r.next(h);
                          })
                        )
                      );
                    if (
                      d &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: h,
                          extractedUrl: m,
                          source: _,
                          restoredState: v,
                          extras: b,
                        } = a,
                        w = new cf(h, this.serializeUrl(m), _, v);
                      r.next(w);
                      const C = Hb(m, this.rootComponentType).snapshot;
                      return G(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: C,
                          urlAfterRedirects: m,
                          extras: Object.assign(Object.assign({}, b), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (
                      (this.rawUrlTree = a.rawUrl),
                      (this.browserUrlTree = a.urlAfterRedirects),
                      a.resolve(null),
                      Uo
                    );
                  }),
                  xf((a) => {
                    const {
                      targetSnapshot: l,
                      id: d,
                      extractedUrl: f,
                      rawUrl: p,
                      extras: { skipLocationChange: h, replaceUrl: m },
                    } = a;
                    return this.hooks.beforePreactivation(l, {
                      navigationId: d,
                      appliedUrlTree: f,
                      rawUrlTree: p,
                      skipLocationChange: !!h,
                      replaceUrl: !!m,
                    });
                  }),
                  xt((a) => {
                    const l = new mk(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  P((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: wN(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function (t, e) {
                    return ze((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: i,
                        },
                      } = n;
                      return 0 === i.length && 0 === s.length
                        ? G(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function (t, e, n, r) {
                            return et(t).pipe(
                              ze((o) =>
                                (function (t, e, n, r, o) {
                                  const s =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? G(
                                        s.map((a) => {
                                          const l = Tl(a, e, o);
                                          let d;
                                          if (
                                            (function (t) {
                                              return t && ir(t.canDeactivate);
                                            })(l)
                                          )
                                            d = Dn(l.canDeactivate(t, e, n, r));
                                          else {
                                            if (!ir(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            d = Dn(l(t, e, n, r));
                                          }
                                          return d.pipe(Ho());
                                        })
                                      ).pipe(fi())
                                    : G(!0);
                                })(o.component, o.route, n, e, r)
                              ),
                              Ho((o) => !0 !== o, !0)
                            );
                          })(i, r, o, t).pipe(
                            ze((a) =>
                              a &&
                              (function (t) {
                                return "boolean" == typeof t;
                              })(a)
                                ? (function (t, e, n, r) {
                                    return et(e).pipe(
                                      Bo((o) =>
                                        sf(
                                          (function (t, e) {
                                            return (
                                              null !== t && e && e(new vk(t)),
                                              G(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function (t, e) {
                                            return (
                                              null !== t && e && e(new wk(t)),
                                              G(!0)
                                            );
                                          })(o.route, r),
                                          (function (t, e, n) {
                                            const r = e[e.length - 1],
                                              s = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((i) =>
                                                  (function (t) {
                                                    const e = t.routeConfig
                                                      ? t.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return e && 0 !== e.length
                                                      ? { node: t, guards: e }
                                                      : null;
                                                  })(i)
                                                )
                                                .filter((i) => null !== i)
                                                .map((i) =>
                                                  yb(() =>
                                                    G(
                                                      i.guards.map((l) => {
                                                        const d = Tl(
                                                          l,
                                                          i.node,
                                                          n
                                                        );
                                                        let f;
                                                        if (
                                                          (function (t) {
                                                            return (
                                                              t &&
                                                              ir(
                                                                t.canActivateChild
                                                              )
                                                            );
                                                          })(d)
                                                        )
                                                          f = Dn(
                                                            d.canActivateChild(
                                                              r,
                                                              t
                                                            )
                                                          );
                                                        else {
                                                          if (!ir(d))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          f = Dn(d(r, t));
                                                        }
                                                        return f.pipe(Ho());
                                                      })
                                                    ).pipe(fi())
                                                  )
                                                );
                                            return G(s).pipe(fi());
                                          })(t, o.path, n),
                                          (function (t, e, n) {
                                            const r = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null;
                                            return r && 0 !== r.length
                                              ? G(
                                                  r.map((s) =>
                                                    yb(() => {
                                                      const i = Tl(s, e, n);
                                                      let a;
                                                      if (
                                                        (function (t) {
                                                          return (
                                                            t &&
                                                            ir(t.canActivate)
                                                          );
                                                        })(i)
                                                      )
                                                        a = Dn(
                                                          i.canActivate(e, t)
                                                        );
                                                      else {
                                                        if (!ir(i))
                                                          throw new Error(
                                                            "Invalid CanActivate guard"
                                                          );
                                                        a = Dn(i(e, t));
                                                      }
                                                      return a.pipe(Ho());
                                                    })
                                                  )
                                                ).pipe(fi())
                                              : G(!0);
                                          })(t, o.route, n)
                                        )
                                      ),
                                      Ho((o) => !0 !== o, !0)
                                    );
                                  })(r, s, t, e)
                                : G(a)
                            ),
                            P((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  xt((a) => {
                    if (Or(a.guardsResult)) {
                      const d = df(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((d.url = a.guardsResult), d);
                    }
                    const l = new _k(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Mr(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  xf((a) => {
                    if (a.guards.canActivateChecks.length)
                      return G(a).pipe(
                        xt((l) => {
                          const d = new yk(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(d);
                        }),
                        or((l) => {
                          let d = !1;
                          return G(l).pipe(
                            (function (t, e) {
                              return ze((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return G(n);
                                let s = 0;
                                return et(o).pipe(
                                  Bo((i) =>
                                    (function (t, e, n, r) {
                                      return (function (t, e, n, r) {
                                        const o = Object.keys(t);
                                        if (0 === o.length) return G({});
                                        const s = {};
                                        return et(o).pipe(
                                          ze((i) =>
                                            (function (t, e, n, r) {
                                              const o = Tl(t, e, r);
                                              return Dn(
                                                o.resolve
                                                  ? o.resolve(e, n)
                                                  : o(e, n)
                                              );
                                            })(t[i], e, n, r).pipe(
                                              xt((a) => {
                                                s[i] = a;
                                              })
                                            )
                                          ),
                                          uf(1),
                                          ze(() =>
                                            Object.keys(s).length === o.length
                                              ? G(s)
                                              : Uo
                                          )
                                        );
                                      })(t._resolve, t, e, r).pipe(
                                        P(
                                          (s) => (
                                            (t._resolvedData = s),
                                            (t.data = Object.assign(
                                              Object.assign({}, t.data),
                                              $b(t, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(i.route, r, t, e)
                                  ),
                                  xt(() => s++),
                                  uf(1),
                                  ze((i) => (s === o.length ? G(n) : Uo))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            xt({
                              next: () => (d = !0),
                              complete: () => {
                                d ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        xt((l) => {
                          const d = new bk(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(d);
                        })
                      );
                  }),
                  xf((a) => {
                    const {
                      targetSnapshot: l,
                      id: d,
                      extractedUrl: f,
                      rawUrl: p,
                      extras: { skipLocationChange: h, replaceUrl: m },
                    } = a;
                    return this.hooks.afterPreactivation(l, {
                      navigationId: d,
                      appliedUrlTree: f,
                      rawUrlTree: p,
                      skipLocationChange: !!h,
                      replaceUrl: !!m,
                    });
                  }),
                  P((a) => {
                    const l = (function (t, e, n) {
                      const r = yl(t, e._root, n ? n._root : void 0);
                      return new Bb(r, e);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  xt((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((t, e, n) =>
                    P(
                      (r) => (
                        new rN(
                          e,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(t),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  xt({
                    next() {
                      s = !0;
                    },
                    complete() {
                      s = !0;
                    },
                  }),
                  (function (t) {
                    return (e) => e.lift(new fk(t));
                  })(() => {
                    if (!s && !i) {
                      const a = `Navigation ID ${o.id} is not equal to the current navigation id ${this.navigationId}`;
                      "replace" === this.canceledNavigationResolution
                        ? (this.restoreHistory(o),
                          this.cancelNavigationTransition(o, a))
                        : this.cancelNavigationTransition(o, a);
                    }
                    this.currentNavigation = null;
                  }),
                  Ar((a) => {
                    if (
                      ((i = !0),
                      (function (t) {
                        return t && t[Ib];
                      })(a))
                    ) {
                      const l = Or(a.url);
                      l || ((this.navigated = !0), this.restoreHistory(o, !0));
                      const d = new Db(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a.message
                      );
                      r.next(d),
                        l
                          ? setTimeout(() => {
                              const f = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                p = {
                                  skipLocationChange:
                                    o.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    Il(o.source),
                                };
                              this.scheduleNavigation(
                                f,
                                "imperative",
                                null,
                                p,
                                {
                                  resolve: o.resolve,
                                  reject: o.reject,
                                  promise: o.promise,
                                }
                              );
                            }, 0)
                          : o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const l = new hk(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a
                      );
                      r.next(l);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (d) {
                        o.reject(d);
                      }
                    }
                    return Uo;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          getTransition() {
            const n = this.transitions.value;
            return (n.urlAfterRedirects = this.browserUrlTree), n;
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.getTransition()), n)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = this.extractLocationChangeInfoFromEvent(n);
                this.shouldScheduleNavigation(this.lastLocationChangeInfo, r) &&
                  setTimeout(() => {
                    const { source: o, state: s, urlTree: i } = r,
                      a = { replaceUrl: !0 };
                    if (s) {
                      const l = Object.assign({}, s);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (a.state = l);
                    }
                    this.scheduleNavigation(i, o, s, a);
                  }, 0),
                  (this.lastLocationChangeInfo = r);
              }));
          }
          extractLocationChangeInfoFromEvent(n) {
            var r;
            return {
              source: "popstate" === n.type ? "popstate" : "hashchange",
              urlTree: this.parseUrl(n.url),
              state: (
                null === (r = n.state) || void 0 === r ? void 0 : r.navigationId
              )
                ? n.state
                : null,
              transitionId: this.getTransition().id,
            };
          }
          shouldScheduleNavigation(n, r) {
            if (!n) return !0;
            const o = r.urlTree.toString() === n.urlTree.toString();
            return (
              r.transitionId !== n.transitionId ||
              !o ||
              !(
                ("hashchange" === r.source && "popstate" === n.source) ||
                ("popstate" === r.source && "hashchange" === n.source)
              )
            );
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            ev(n),
              (this.config = n.map(Df)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: s,
                fragment: i,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              d = o || this.routerState.root,
              f = l ? this.currentUrlTree.fragment : i;
            let p = null;
            switch (a) {
              case "merge":
                p = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  s
                );
                break;
              case "preserve":
                p = this.currentUrlTree.queryParams;
                break;
              default:
                p = s || null;
            }
            return (
              null !== p && (p = this.removeEmptyProps(p)),
              (function (t, e, n, r, o) {
                if (0 === n.length) return bf(e.root, e.root, e, r, o);
                const s = (function (t) {
                  if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
                    return new Qb(!0, 0, t);
                  let e = 0,
                    n = !1;
                  const r = t.reduce((o, s, i) => {
                    if ("object" == typeof s && null != s) {
                      if (s.outlets) {
                        const a = {};
                        return (
                          Ge(s.outlets, (l, d) => {
                            a[d] = "string" == typeof l ? l.split("/") : l;
                          }),
                          [...o, { outlets: a }]
                        );
                      }
                      if (s.segmentPath) return [...o, s.segmentPath];
                    }
                    return "string" != typeof s
                      ? [...o, s]
                      : 0 === i
                      ? (s.split("/").forEach((a, l) => {
                          (0 == l && "." === a) ||
                            (0 == l && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? e++
                              : "" != a && o.push(a));
                        }),
                        o)
                      : [...o, s];
                  }, []);
                  return new Qb(n, e, r);
                })(n);
                if (s.toRoot()) return bf(e.root, new te([], {}), e, r, o);
                const i = (function (t, e, n) {
                    if (t.isAbsolute) return new vf(e.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const s = n.snapshot._urlSegment;
                      return new vf(s, s === e.root, 0);
                    }
                    const r = bl(t.commands[0]) ? 0 : 1;
                    return (function (t, e, n) {
                      let r = t,
                        o = e,
                        s = n;
                      for (; s > o; ) {
                        if (((s -= o), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        o = r.segments.length;
                      }
                      return new vf(r, !1, o - s);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      t.numberOfDoubleDots
                    );
                  })(s, e, t),
                  a = i.processChildren
                    ? vl(i.segmentGroup, i.index, s.commands)
                    : Jb(i.segmentGroup, i.index, s.commands);
                return bf(i.segmentGroup, a, e, r, o);
              })(d, this.currentUrlTree, n, p, null != f ? f : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Or(n) ? n : this.parseUrl(n),
              s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function (t) {
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${e}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (
              ((o =
                !0 === r
                  ? Object.assign({}, eO)
                  : !1 === r
                  ? Object.assign({}, tO)
                  : r),
              Or(n))
            )
              return Ab(this.currentUrlTree, n, o);
            const s = this.parseUrl(n);
            return Ab(this.currentUrlTree, s, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const s = n[o];
              return null != s && (r[o] = s), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new ii(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, o, s, i) {
            var a, l;
            if (this.disposed) return Promise.resolve(!1);
            const d = this.getTransition(),
              f = Il(r) && d && !Il(d.source),
              m =
                (this.lastSuccessfulId === d.id || this.currentNavigation
                  ? d.rawUrl
                  : d.urlAfterRedirects
                ).toString() === n.toString();
            if (f && m) return Promise.resolve(!0);
            let _, v, b;
            i
              ? ((_ = i.resolve), (v = i.reject), (b = i.promise))
              : (b = new Promise((M, k) => {
                  (_ = M), (v = k);
                }));
            const w = ++this.navigationId;
            let C;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (C =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : s.replaceUrl || s.skipLocationChange
                      ? null !== (a = this.browserPageId) && void 0 !== a
                        ? a
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l
                          ? l
                          : 0) + 1))
                : (C = 0),
              this.setTransition({
                id: w,
                targetPageId: C,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: s,
                resolve: _,
                reject: v,
                promise: b,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              b.catch((M) => Promise.reject(M))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              s = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", s)
              : this.location.go(o, "", s);
          }
          restoreHistory(n, r = !1) {
            var o, s;
            if ("computed" === this.canceledNavigationResolution) {
              const i = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (o = this.currentNavigation) || void 0 === o
                    ? void 0
                    : o.finalUrl)) ||
              0 === i
                ? this.currentUrlTree ===
                    (null === (s = this.currentNavigation) || void 0 === s
                      ? void 0
                      : s.finalUrl) &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(i);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const o = new Db(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(o), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(
              S(zi),
              S(ff),
              S(Wo),
              S(Ja),
              S(ue),
              S(Va),
              S(Tr),
              S(void 0)
            );
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Il(t) {
        return "imperative" !== t;
      }
      let Sl = (() => {
        class t {
          constructor(n, r, o) {
            (this.router = n),
              (this.route = r),
              (this.locationStrategy = o),
              (this.commands = []),
              (this.onChanges = new xn()),
              (this.subscription = n.events.subscribe((s) => {
                s instanceof ii && this.updateTargetUrlAndHref();
              }));
          }
          set routerLink(n) {
            this.commands = null != n ? (Array.isArray(n) ? n : [n]) : [];
          }
          ngOnChanges(n) {
            this.updateTargetUrlAndHref(), this.onChanges.next(this);
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onClick(n, r, o, s, i) {
            if (
              0 !== n ||
              r ||
              o ||
              s ||
              i ||
              ("string" == typeof this.target && "_self" != this.target)
            )
              return !0;
            const a = {
              skipLocationChange: zo(this.skipLocationChange),
              replaceUrl: zo(this.replaceUrl),
              state: this.state,
            };
            return this.router.navigateByUrl(this.urlTree, a), !1;
          }
          updateTargetUrlAndHref() {
            this.href = this.locationStrategy.prepareExternalUrl(
              this.router.serializeUrl(this.urlTree)
            );
          }
          get urlTree() {
            return this.router.createUrlTree(this.commands, {
              relativeTo:
                void 0 !== this.relativeTo ? this.relativeTo : this.route,
              queryParams: this.queryParams,
              fragment: this.fragment,
              queryParamsHandling: this.queryParamsHandling,
              preserveFragment: zo(this.preserveFragment),
            });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(ce), T(qo), T(Rr));
          }),
          (t.ɵdir = Qe({
            type: t,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""],
            ],
            hostVars: 2,
            hostBindings: function (n, r) {
              1 & n &&
                D("click", function (s) {
                  return r.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & n && (Ic("href", r.href, U), mc("target", r.target));
            },
            inputs: {
              routerLink: "routerLink",
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              state: "state",
              relativeTo: "relativeTo",
            },
            features: [hr],
          })),
          t
        );
      })();
      function zo(t) {
        return "" === t || !!t;
      }
      let Sf = (() => {
        class t {
          constructor(n, r, o, s, i) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = o),
              (this.changeDetector = i),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Lt()),
              (this.deactivateEvents = new Lt()),
              (this.name = s || X),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (this.activated = null), (this._activatedRoute = null), n;
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const i = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new sO(n, a, this.location.injector);
            (this.activated = this.location.createComponent(
              i,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(
              T(Wo),
              T(Zt),
              T(Dr),
              (function (t) {
                return (function (t, e) {
                  if ("class" === e) return t.classes;
                  if ("style" === e) return t.styles;
                  const n = t.attrs;
                  if (n) {
                    const r = n.length;
                    let o = 0;
                    for (; o < r; ) {
                      const s = n[o];
                      if (kp(s)) break;
                      if (0 === s) o += 2;
                      else if ("number" == typeof s)
                        for (o++; o < r && "string" == typeof n[o]; ) o++;
                      else {
                        if (s === e) return n[o + 1];
                        o += 2;
                      }
                    }
                  }
                  return null;
                })(Oe(), t);
              })("name"),
              T(Lc)
            );
          }),
          (t.ɵdir = Qe({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class sO {
        constructor(e, n, r) {
          (this.route = e), (this.childContexts = n), (this.parent = r);
        }
        get(e, n) {
          return e === qo
            ? this.route
            : e === Wo
            ? this.childContexts
            : this.parent.get(e, n);
        }
      }
      class mv {}
      class _v {
        preload(e, n) {
          return G(null);
        }
      }
      let yv = (() => {
          class t {
            constructor(n, r, o, s, i) {
              (this.router = n),
                (this.injector = s),
                (this.preloadingStrategy = i),
                (this.loader = new hv(
                  r,
                  o,
                  (d) => n.triggerEvent(new Eb(d)),
                  (d) => n.triggerEvent(new xb(d))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Mr((n) => n instanceof ii),
                  Bo(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(Cn);
              return this.processRoutes(n, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const o = [];
              for (const s of r)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const i = s._loadedConfig;
                  o.push(this.processRoutes(i.module, i.routes));
                } else
                  s.loadChildren && !s.canLoad
                    ? o.push(this.preloadConfig(n, s))
                    : s.children && o.push(this.processRoutes(n, s.children));
              return et(o).pipe(
                Xo(),
                P((s) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? G(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  ze(
                    (s) => (
                      (r._loadedConfig = s),
                      this.processRoutes(s.module, s.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(ce), S(Va), S(Tr), S(ue), S(mv));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pf = (() => {
          class t {
            constructor(n, r, o = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = o),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (o.scrollPositionRestoration =
                  o.scrollPositionRestoration || "disabled"),
                (o.anchorScrolling = o.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof cf
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof ii &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Tb &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new Tb(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(ce), S(nb), S(void 0));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Fr = new ne("ROUTER_CONFIGURATION"),
        bv = new ne("ROUTER_FORROOT_GUARD"),
        aO = [
          Ja,
          { provide: ff, useClass: Fb },
          {
            provide: ce,
            useFactory: function (t, e, n, r, o, s, i, a = {}, l, d) {
              const f = new ce(null, t, e, n, r, o, s, Pb(i));
              return (
                l && (f.urlHandlingStrategy = l),
                d && (f.routeReuseStrategy = d),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy);
                })(a, f),
                a.enableTracing &&
                  f.events.subscribe((p) => {
                    var h, m;
                    null === (h = console.group) ||
                      void 0 === h ||
                      h.call(console, `Router Event: ${p.constructor.name}`),
                      console.log(p.toString()),
                      console.log(p),
                      null === (m = console.groupEnd) ||
                        void 0 === m ||
                        m.call(console);
                  }),
                f
              );
            },
            deps: [
              ff,
              Wo,
              Ja,
              ue,
              Va,
              Tr,
              Tf,
              Fr,
              [class {}, new pt()],
              [class {}, new pt()],
            ],
          },
          Wo,
          {
            provide: qo,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [ce],
          },
          { provide: Va, useClass: tR },
          yv,
          _v,
          class {
            preload(e, n) {
              return n().pipe(Ar(() => G(null)));
            }
          },
          { provide: Fr, useValue: { enableTracing: !1 } },
        ];
      function lO() {
        return new bd("Router", ce);
      }
      let uO = (() => {
        class t {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: t,
              providers: [
                aO,
                vv(n),
                {
                  provide: bv,
                  useFactory: fO,
                  deps: [[ce, new pt(), new Kn()]],
                },
                { provide: Fr, useValue: r || {} },
                {
                  provide: Rr,
                  useFactory: dO,
                  deps: [Pr, [new no(Fd), new pt()], Fr],
                },
                { provide: Pf, useFactory: cO, deps: [ce, nb, Fr] },
                {
                  provide: mv,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : _v,
                },
                { provide: bd, multi: !0, useFactory: lO },
                [
                  Rf,
                  { provide: Js, multi: !0, useFactory: mO, deps: [Rf] },
                  { provide: Cv, useFactory: _O, deps: [Rf] },
                  { provide: Qy, multi: !0, useExisting: Cv },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: t, providers: [vv(n)] };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(bv, 8), S(ce, 8));
          }),
          (t.ɵmod = qn({ type: t })),
          (t.ɵinj = ln({})),
          t
        );
      })();
      function cO(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Pf(t, e, n);
      }
      function dO(t, e, n = {}) {
        return n.useHash ? new j0(t, e) : new V0(t, e);
      }
      function fO(t) {
        return "guarded";
      }
      function vv(t) {
        return [
          { provide: vw, multi: !0, useValue: t },
          { provide: Tf, multi: !0, useValue: t },
        ];
      }
      let Rf = (() => {
        class t {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new xn());
          }
          appInitializer() {
            return this.injector.get(yM, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const o = new Promise((a) => (r = a)),
                s = this.injector.get(ce),
                i = this.injector.get(Fr);
              return (
                "disabled" === i.initialNavigation
                  ? (s.setUpLocationChangeListener(), r(!0))
                  : "enabled" === i.initialNavigation ||
                    "enabledBlocking" === i.initialNavigation
                  ? ((s.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? G(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    s.initialNavigation())
                  : r(!0),
                o
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(Fr),
              o = this.injector.get(yv),
              s = this.injector.get(Pf),
              i = this.injector.get(ce),
              a = this.injector.get(Lo);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                i.initialNavigation(),
              o.setUpPreloading(),
              s.init(),
              i.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(ue));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function mO(t) {
        return t.appInitializer.bind(t);
      }
      function _O(t) {
        return t.bootstrapListener.bind(t);
      }
      const Cv = new ne("Router Initializer");
      let bO = (() => {
          class t {
            constructor() {
              this.title = "cust-engage-app";
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && I(0, "router-outlet");
              },
              directives: [Sf],
              styles: [""],
            })),
            t
          );
        })(),
        vO = (() => {
          class t {
            constructor(n) {
              this.router = n;
            }
            ngOnInit() {
              this.router.navigate(["/dashboard"]);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-topbar"]],
              decls: 0,
              vars: 0,
              template: function (n, r) {},
              styles: [""],
            })),
            t
          );
        })();
      const Ce_baseURL = "http://urbanyogcustoengage.uglifestyle.in/";
      class wv {}
      class Dv {}
      class Un {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                s = o.toLowerCase(),
                                i = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(i)
                                  : this.headers.set(s, [i]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((n) => {
                            let r = e[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const n = this.headers.get(e.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, n) {
          return this.clone({ name: e, value: n, op: "a" });
        }
        set(e, n) {
          return this.clone({ name: e, value: n, op: "s" });
        }
        delete(e, n) {
          return this.clone({ name: e, value: n, op: "d" });
        }
        maybeSetNormalizedName(e, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Un
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((n) => {
              this.headers.set(n, e.headers.get(n)),
                this.normalizedNames.set(n, e.normalizedNames.get(n));
            });
        }
        clone(e) {
          const n = new Un();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Un
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            n
          );
        }
        applyUpdate(e) {
          const n = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let r = e.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(e.name, n);
              const o = ("a" === e.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const s = e.value;
              if (s) {
                let i = this.headers.get(n);
                if (!i) return;
                (i = i.filter((a) => -1 === s.indexOf(a))),
                  0 === i.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, i);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              e(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class CO {
        encodeKey(e) {
          return Ev(e);
        }
        encodeValue(e) {
          return Ev(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const DO = /%(\d[a-f0-9])/gi,
        EO = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "2B": "+",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Ev(t) {
        return encodeURIComponent(t).replace(DO, (e, n) => {
          var r;
          return null !== (r = EO[n]) && void 0 !== r ? r : e;
        });
      }
      function xv(t) {
        return `${t}`;
      }
      class ar {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new CO()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const s = o.indexOf("="),
                        [i, a] =
                          -1 == s
                            ? [e.decodeKey(o), ""]
                            : [
                                e.decodeKey(o.slice(0, s)),
                                e.decodeValue(o.slice(s + 1)),
                              ],
                        l = n.get(i) || [];
                      l.push(a), n.set(i, l);
                    }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((n) => {
                  const r = e.fromObject[n];
                  this.map.set(n, Array.isArray(r) ? r : [r]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const n = this.map.get(e);
          return n ? n[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, n) {
          return this.clone({ param: e, value: n, op: "a" });
        }
        appendAll(e) {
          const n = [];
          return (
            Object.keys(e).forEach((r) => {
              const o = e[r];
              Array.isArray(o)
                ? o.forEach((s) => {
                    n.push({ param: r, value: s, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(e, n) {
          return this.clone({ param: e, value: n, op: "s" });
        }
        delete(e, n) {
          return this.clone({ param: e, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const n = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const n = new ar({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(e)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    n.push(xv(e.value)), this.map.set(e.param, n);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let r = this.map.get(e.param) || [];
                      const o = r.indexOf(xv(e.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(e.param, r)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class xO {
        constructor() {
          this.map = new Map();
        }
        set(e, n) {
          return this.map.set(e, n), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function Tv(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function Iv(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function Sv(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class mi {
        constructor(e, n, r, o) {
          let s;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (s = o))
              : (s = r),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new Un()),
            this.context || (this.context = new xO()),
            this.params)
          ) {
            const i = this.params.toString();
            if (0 === i.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + i;
            }
          } else (this.params = new ar()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Tv(this.body) ||
              Iv(this.body) ||
              Sv(this.body) ||
              (function (t) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  t instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof ar
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Sv(this.body)
            ? null
            : Iv(this.body)
            ? this.body.type || null
            : Tv(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof ar
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          var n;
          const r = e.method || this.method,
            o = e.url || this.url,
            s = e.responseType || this.responseType,
            i = void 0 !== e.body ? e.body : this.body,
            a =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            l =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let d = e.headers || this.headers,
            f = e.params || this.params;
          const p = null !== (n = e.context) && void 0 !== n ? n : this.context;
          return (
            void 0 !== e.setHeaders &&
              (d = Object.keys(e.setHeaders).reduce(
                (h, m) => h.set(m, e.setHeaders[m]),
                d
              )),
            e.setParams &&
              (f = Object.keys(e.setParams).reduce(
                (h, m) => h.set(m, e.setParams[m]),
                f
              )),
            new mi(r, o, i, {
              params: f,
              headers: d,
              context: p,
              reportProgress: l,
              responseType: s,
              withCredentials: a,
            })
          );
        }
      }
      var ke = (() => (
        ((ke = ke || {})[(ke.Sent = 0)] = "Sent"),
        (ke[(ke.UploadProgress = 1)] = "UploadProgress"),
        (ke[(ke.ResponseHeader = 2)] = "ResponseHeader"),
        (ke[(ke.DownloadProgress = 3)] = "DownloadProgress"),
        (ke[(ke.Response = 4)] = "Response"),
        (ke[(ke.User = 5)] = "User"),
        ke
      ))();
      class Mf {
        constructor(e, n = 200, r = "OK") {
          (this.headers = e.headers || new Un()),
            (this.status = void 0 !== e.status ? e.status : n),
            (this.statusText = e.statusText || r),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Af extends Mf {
        constructor(e = {}) {
          super(e), (this.type = ke.ResponseHeader);
        }
        clone(e = {}) {
          return new Af({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class Pl extends Mf {
        constructor(e = {}) {
          super(e),
            (this.type = ke.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new Pl({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class Pv extends Mf {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function kf(t, e) {
        return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let we = (() => {
        class t {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let s;
            if (n instanceof mi) s = n;
            else {
              let l, d;
              (l = o.headers instanceof Un ? o.headers : new Un(o.headers)),
                o.params &&
                  (d =
                    o.params instanceof ar
                      ? o.params
                      : new ar({ fromObject: o.params })),
                (s = new mi(n, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: d,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const i = G(s).pipe(Bo((l) => this.handler.handle(l)));
            if (n instanceof mi || "events" === o.observe) return i;
            const a = i.pipe(Mr((l) => l instanceof Pl));
            switch (o.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      P((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      P((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      P((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  case "json":
                  default:
                    return a.pipe(P((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new ar().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, kf(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, kf(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, kf(o, r));
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(wv));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Rv {
        constructor(e, n) {
          (this.next = e), (this.interceptor = n);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const Mv = new ne("HTTP_INTERCEPTORS");
      let SO = (() => {
        class t {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const PO = /^\)\]\}',?\n/;
      let Av = (() => {
        class t {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new me((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((m, _) => o.setRequestHeader(m, _.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const m = n.detectContentTypeHeader();
                null !== m && o.setRequestHeader("Content-Type", m);
              }
              if (n.responseType) {
                const m = n.responseType.toLowerCase();
                o.responseType = "json" !== m ? m : "text";
              }
              const s = n.serializeBody();
              let i = null;
              const a = () => {
                  if (null !== i) return i;
                  const m = 1223 === o.status ? 204 : o.status,
                    _ = o.statusText || "OK",
                    v = new Un(o.getAllResponseHeaders()),
                    b =
                      (function (t) {
                        return "responseURL" in t && t.responseURL
                          ? t.responseURL
                          : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                          ? t.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (i = new Af({
                      headers: v,
                      status: m,
                      statusText: _,
                      url: b,
                    })),
                    i
                  );
                },
                l = () => {
                  let { headers: m, status: _, statusText: v, url: b } = a(),
                    w = null;
                  204 !== _ &&
                    (w = void 0 === o.response ? o.responseText : o.response),
                    0 === _ && (_ = w ? 200 : 0);
                  let C = _ >= 200 && _ < 300;
                  if ("json" === n.responseType && "string" == typeof w) {
                    const M = w;
                    w = w.replace(PO, "");
                    try {
                      w = "" !== w ? JSON.parse(w) : null;
                    } catch (k) {
                      (w = M), C && ((C = !1), (w = { error: k, text: w }));
                    }
                  }
                  C
                    ? (r.next(
                        new Pl({
                          body: w,
                          headers: m,
                          status: _,
                          statusText: v,
                          url: b || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new Pv({
                          error: w,
                          headers: m,
                          status: _,
                          statusText: v,
                          url: b || void 0,
                        })
                      );
                },
                d = (m) => {
                  const { url: _ } = a(),
                    v = new Pv({
                      error: m,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: _ || void 0,
                    });
                  r.error(v);
                };
              let f = !1;
              const p = (m) => {
                  f || (r.next(a()), (f = !0));
                  let _ = { type: ke.DownloadProgress, loaded: m.loaded };
                  m.lengthComputable && (_.total = m.total),
                    "text" === n.responseType &&
                      !!o.responseText &&
                      (_.partialText = o.responseText),
                    r.next(_);
                },
                h = (m) => {
                  let _ = { type: ke.UploadProgress, loaded: m.loaded };
                  m.lengthComputable && (_.total = m.total), r.next(_);
                };
              return (
                o.addEventListener("load", l),
                o.addEventListener("error", d),
                o.addEventListener("timeout", d),
                o.addEventListener("abort", d),
                n.reportProgress &&
                  (o.addEventListener("progress", p),
                  null !== s &&
                    o.upload &&
                    o.upload.addEventListener("progress", h)),
                o.send(s),
                r.next({ type: ke.Sent }),
                () => {
                  o.removeEventListener("error", d),
                    o.removeEventListener("abort", d),
                    o.removeEventListener("load", l),
                    o.removeEventListener("timeout", d),
                    n.reportProgress &&
                      (o.removeEventListener("progress", p),
                      null !== s &&
                        o.upload &&
                        o.upload.removeEventListener("progress", h)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(S(ob));
          }),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Nf = new ne("XSRF_COOKIE_NAME"),
        Of = new ne("XSRF_HEADER_NAME");
      class kv {}
      let MO = (() => {
          class t {
            constructor(n, r, o) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = o),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = J0(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(We), S(Oa), S(Nf));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ff = (() => {
          class t {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const o = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                o.startsWith("http://") ||
                o.startsWith("https://")
              )
                return r.handle(n);
              const s = this.tokenService.getToken();
              return (
                null !== s &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, s) })),
                r.handle(n)
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(kv), S(Of));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        AO = (() => {
          class t {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(Mv, []);
                this.chain = r.reduceRight(
                  (o, s) => new Rv(o, s),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(Dv), S(ue));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        kO = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: Ff, useClass: SO }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: t,
                providers: [
                  n.cookieName ? { provide: Nf, useValue: n.cookieName } : [],
                  n.headerName ? { provide: Of, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = qn({ type: t })),
            (t.ɵinj = ln({
              providers: [
                Ff,
                { provide: Mv, useExisting: Ff, multi: !0 },
                { provide: kv, useClass: MO },
                { provide: Nf, useValue: "XSRF-TOKEN" },
                { provide: Of, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        NO = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = qn({ type: t })),
            (t.ɵinj = ln({
              providers: [
                we,
                { provide: wv, useClass: AO },
                Av,
                { provide: Dv, useExisting: Av },
              ],
              imports: [
                [
                  kO.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })();
      function OO(t, e) {
        if (
          (1 & t &&
            (u(0, "a", 16), I(1, "img", 17), u(2, "p", 18), g(3), c(), c()),
          2 & t)
        ) {
          const n = e.$implicit;
          O("routerLink", n.link),
            y(1),
            B("src", n.logo, U),
            y(2),
            x(n.cat_name);
        }
      }
      function FO(t, e) {
        if ((1 & t && (u(0, "div"), oe(1, OO, 4, 3, "a", 15), c()), 2 & t)) {
          const n = Nt().$implicit;
          He("", n.sub_category_display, " transition-all duration-300"),
            y(1),
            O("ngForOf", n.sub_cat);
        }
      }
      function LO(t, e) {
        if (1 & t) {
          const n = Rs();
          u(0, "div", 9),
            u(1, "a", 10),
            D("click", function (o) {
              const i = Wr(n).index;
              return Nt().onClickDisplayChange(o, i);
            }),
            I(2, "img", 11),
            u(3, "p", 12),
            g(4),
            c(),
            I(5, "img", 13),
            c(),
            oe(6, FO, 2, 4, "div", 14),
            c();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = Nt();
          y(1),
            He(
              "relative flex p-2 space-x-3 bg-white ",
              n.onClickDisplayChangeOpacity,
              " cursor-pointer select-none  hover:bg-opacity-10 group"
            ),
            B("id", n.cat_name),
            O("routerLink", n.link),
            y(1),
            B("src", n.logo, U),
            y(2),
            x(n.cat_name),
            y(1),
            vn(
              "absolute ",
              n.arrow_display,
              " right-4 w-3 h-3 m-1 ",
              n.arrow_rotation,
              " transform"
            ),
            B("src", r.arrow, U),
            y(1),
            O("ngIf", r.uncollapsed);
        }
      }
      let gt = (() => {
        class t {
          constructor() {
            (this.s_logo = "../../../assets/sidebar_cancel-orders.png"),
              (this.arrow = "../../../assets/dashboard_right-arrow.png"),
              (this.logo = "../../../assets/custoengage_logo.png"),
              (this.profile_img = "../../../assets/profile_img.jpg"),
              (this.user_name = ""),
              (this.uncollapsed = !1),
              (this.sidebar_list_element = [
                {
                  cat_name: "Dashboard",
                  logo: "../../../assets/sidebar_dashboard.png",
                  link: "/dashboard",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [],
                },
                {
                  cat_name: "QR Manager",
                  logo: "../../../assets/sidebar_qr-code.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Batch Master",
                      logo: "../../../assets/sidebar_qr-code.png",
                      link: "/qr-manager/batch-master",
                    },
                  ],
                },
                {
                  cat_name: "Orders",
                  logo: "../../../assets/sidebar_orders.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Cancel Orders",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "",
                    },
                  ],
                },
                {
                  cat_name: "Wallet",
                  logo: "../../../assets/sidebar_wallet.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Wallet Clubs",
                      logo: "../../../assets/sidebar_wallet.png",
                      link: "",
                    },
                    {
                      cat_name: "Customer Wallet",
                      logo: "../../../assets/sidebar_wallet.png",
                      link: "",
                    },
                    {
                      cat_name: "Wallet History",
                      logo: "../../../assets/sidebar_wallet.png",
                      link: "",
                    },
                  ],
                },
                {
                  cat_name: "Masters",
                  logo: "../../../assets/sidebar_masters.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Users",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/masters/users",
                    },
                    {
                      cat_name: "Customers",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "",
                    },
                    {
                      cat_name: "Products",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/masters/products",
                    },
                    {
                      cat_name: "Product USP",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/masters/products-usp",
                    },
                    {
                      cat_name: "Discount Master",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "",
                    },
                  ],
                },
                {
                  cat_name: "Third Party",
                  logo: "../../../assets/sidebar_masters.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "TPM Apps",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/third-party/tpm-apps",
                    },
                    {
                      cat_name: "TPM Product Review Links",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/third-party/tpm-product-review-links",
                    },
                  ],
                },
                {
                  cat_name: "Product Suggestion Masters",
                  logo: "../../../assets/sidebar_masters.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Product FAQ's",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "",
                    },
                    {
                      cat_name: "Product Reviews",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/product-suggestion-master/product-reviews",
                    },
                    {
                      cat_name: "Product Review Images",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/product-suggestion-master/product-review-images",
                    },
                    {
                      cat_name: "Product Videos",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/product-suggestion-master/product-videos",
                    },
                    {
                      cat_name: "Product Suggestion",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "/product-suggestion-master/product-suggestion",
                    },
                  ],
                },
                {
                  cat_name: "SEO",
                  logo: "../../../assets/sidebar_seo.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Meta Keywords",
                      logo: "../../../assets/sidebar_seo.png",
                      link: "",
                    },
                  ],
                },
                {
                  cat_name: "Customer Queries",
                  logo: "../../../assets/sidebar_queries.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "Website Order Issues",
                      logo: "../../../assets/sidebar_queries.png",
                      link: "",
                    },
                    {
                      cat_name: "QR Scan Call Requests",
                      logo: "../../../assets/sidebar_queries.png",
                      link: "",
                    },
                    {
                      cat_name: "Customer Feedback",
                      logo: "../../../assets/sidebar_queries.png",
                      link: "",
                    },
                  ],
                },
                {
                  cat_name: "Reports",
                  logo: "../../../assets/sidebar_reports.png",
                  sub_category_display: "hidden",
                  onClickDisplayChangeOpacity: "bg-opacity-0",
                  arrow_display: "block",
                  arrow_rotation: "rotate-0",
                  sub_cat: [
                    {
                      cat_name: "QR Scans",
                      logo: "../../../assets/sidebar_masters.png",
                      link: "",
                    },
                    {
                      cat_name: "Suspicious Scans",
                      logo: "../../../assets/sidebar_reports.png",
                      link: "",
                    },
                    {
                      cat_name: "Product Frequently Bought Together",
                      logo: "../../../assets/sidebar_reports.png",
                      link: "",
                    },
                  ],
                },
              ]);
          }
          fetchCookies() {
            const r = document.cookie.split(";"),
              s = (r[1].split("="), r[0].split("="));
            this.user_name = s[1];
          }
          onClickDisplayChange(n, r) {
            !0 === this.uncollapsed
              ? ((this.sidebar_list_element[r].sub_category_display = "hidden"),
                (this.sidebar_list_element[r].arrow_rotation = "rotate-0"),
                (this.sidebar_list_element[r].onClickDisplayChangeOpacity =
                  "bg-opacity-0"),
                (this.uncollapsed = !1),
                console.log(r))
              : ((this.sidebar_list_element[r].sub_category_display = "block"),
                (this.sidebar_list_element[r].arrow_rotation = "rotate-90"),
                (this.sidebar_list_element[r].onClickDisplayChangeOpacity =
                  "bg-opacity-10"),
                (this.uncollapsed = !0),
                console.log(r));
          }
          logOut() {
            const r = document.cookie.split(";");
            for (var o = 0; o < r.length; o++) {
              const i = new Date().toUTCString();
              (document.cookie = `${r[o]};expires=${i}`), location.reload();
            }
          }
          salutation() {
            const r = new Date().getHours();
            this.greeting =
              r >= 0 && r < 12
                ? "Good Morning"
                : r >= 12 && r < 18
                ? "Good Afternoon"
                : "Good Evening";
          }
          ngOnInit() {
            this.fetchCookies(), this.salutation();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-sidebar"]],
            decls: 13,
            vars: 4,
            consts: [
              [
                1,
                "hidden",
                "w-64",
                "h-screen",
                "overflow-auto",
                "bg-black",
                "shadow-xl",
                "md:block",
                "no-scrollbar",
                "bg-opacity-90",
              ],
              [1, "p-2", "space-y-6"],
              [1, "mx-auto", "rounded-2xl", "w-52", 3, "src"],
              [
                1,
                "py-2",
                "text-lg",
                "font-bold",
                "text-center",
                "text-gray-200",
                "uppercase",
              ],
              [1, "space-y-2"],
              ["class", "", 4, "ngFor", "ngForOf"],
              [1, "mx-auto", "my-12", "max-w-max"],
              [
                1,
                "px-3",
                "py-2",
                "text-xl",
                "font-semibold",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-red-600",
                "hover:bg-red-400",
                3,
                "click",
              ],
              [1, "w-12", "h-screen", "bg-black", "bg-opacity-90"],
              [1, ""],
              [3, "routerLink", "id", "click"],
              [1, "w-5", "h-5", 3, "src"],
              [
                1,
                "text-sm",
                "font-semibold",
                "text-white",
                "transition-all",
                "duration-300",
                "group-hover:translate-x-2",
                "group-hover:transform",
              ],
              [3, "src"],
              [3, "class", 4, "ngIf"],
              [
                "class",
                "flex p-2 pl-5 space-x-3 cursor-pointer select-none group hover:bg-white hover:bg-opacity-20 ",
                3,
                "routerLink",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                1,
                "flex",
                "p-2",
                "pl-5",
                "space-x-3",
                "cursor-pointer",
                "select-none",
                "group",
                "hover:bg-white",
                "hover:bg-opacity-20",
                3,
                "routerLink",
              ],
              [1, "w-4", "h-4", 3, "src"],
              [
                1,
                "text-base",
                "font-semibold",
                "text-white",
                "transition-all",
                "duration-300",
                "group-hover:translate-x-2",
                "group-hover:transform",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "div", 1),
                I(2, "img", 2),
                u(3, "p", 3),
                g(4),
                I(5, "br"),
                g(6),
                c(),
                c(),
                u(7, "div", 4),
                oe(8, LO, 7, 13, "div", 5),
                c(),
                u(9, "div", 6),
                u(10, "button", 7),
                D("click", function () {
                  return r.logOut();
                }),
                g(11, "Logout"),
                c(),
                c(),
                c(),
                I(12, "div", 8)),
                2 & n &&
                  (y(2),
                  B("src", r.logo, U),
                  y(2),
                  x(r.greeting),
                  y(2),
                  x(r.user_name),
                  y(2),
                  O("ngForOf", r.sidebar_list_element));
            },
            directives: [je, Sl, Y0],
            styles: [""],
          })),
          t
        );
      })();
      function VO(t, e) {
        if ((1 & t && (u(0, "option", 23), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      let Lf = (() => {
        class t {
          constructor(n) {
            (this.http = n),
              (this._url = Ce_baseURL),
              (this.postData = {
                pid: "",
                review: "",
                review_title: "",
                star_count: "",
                cust_name: "",
                cust_email: "",
                cust_location: "",
                shopify_cust_id: null,
                status: 0,
                admin_reply: "",
                created_at: "",
                updated_at: "",
              }),
              (this.selectedProduct_pid = "1"),
              (this.msg_popup_display = "hidden"),
              (this.msg_popup_msg = ""),
              (this.msg_popup_color = "");
          }
          reviewOnChange(n) {
            this.postData.review = n.target.value;
          }
          reviewTitleOnChange(n) {
            this.postData.review_title = n.target.value;
          }
          starCountOnChange(n) {
            this.postData.star_count = n.target.value;
          }
          custNameOnChange(n) {
            this.postData.cust_name = n.target.value;
          }
          custEmailOnChange(n) {
            this.postData.cust_email = n.target.value;
          }
          custLocOnChange(n) {
            this.postData.cust_location = n.target.value;
          }
          adminReplyOnChange(n) {
            this.postData.admin_reply = n.target.value;
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.products = n.rows;
              });
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              (this.postData.pid = n.target.value),
              console.log(
                this._url +
                  "postProductReview/" +
                  String(this.selectedProduct_pid)
              );
          }
          sendOnClick() {
            const n = new Date(),
              r_year = n.getFullYear(),
              r_month = n.getMonth(),
              r_date = n.getDate(),
              r_hours = n.getHours(),
              r_min = n.getMinutes(),
              r_sec = n.getSeconds();
            (this.postData.created_at = `${r_date}-${
              r_month + 1
            }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
              (this.postData.updated_at = `${r_date}-${
                r_month + 1
              }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
              console.log(this.postData),
              console.log(this.selectedProduct_pid),
              this.http
                .post(
                  this._url + "postProductReview/" + this.selectedProduct_pid,
                  this.postData
                )
                .subscribe(
                  (o) => {
                    console.log("Response in return: ", o),
                      (this.msg_popup_color = "bg-green-700"),
                      (this.msg_popup_msg = "Uesr added successfully"),
                      (this.msg_popup_display = "block");
                  },
                  (o) => {
                    (this.msg_popup_color = "bg-red-700"),
                      (this.msg_popup_msg = o.error.data),
                      (this.msg_popup_display = "block");
                  }
                );
          }
          ngOnInit() {
            this.fetchProductsDetails();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-add-product-rev"]],
            decls: 49,
            vars: 6,
            consts: [
              ["id", "msg_popup"],
              [1, "text-gray-50"],
              [1, "mx-auto", "overflow-auto", "max-w-max"],
              [1, "relative", "space-y-4", "bg-gray-100", "rounded-md", "p-7"],
              [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
              [1, "space-x-6"],
              [1, "text-sm", "text-gray-900", "w-36"],
              [
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "change",
              ],
              [
                "class",
                "text-lg text-gray-700 ",
                3,
                "value",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "flex", "flex-row", "space-x-6"],
              [1, "mt-3", "text-sm", "text-gray-900", "w-36"],
              [
                "placeholder",
                "Enter review title",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [1, "mt-6", "text-sm", "text-gray-900", "w-36"],
              [
                "placeholder",
                "Give your review here...",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "type",
                "number",
                "max",
                "5",
                "min",
                "1",
                "placeholder",
                "Give the ratings",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Enter customer's name",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Enter customer's email",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Give customer location",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Give your reply to the review here...",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Select a image/videos",
                "type",
                "file",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
              ],
              [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
              [
                "type",
                "button",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-green-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-green-700",
                3,
                "click",
              ],
              [
                "type",
                "",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-gray-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-gray-500",
              ],
              [1, "text-lg", "text-gray-700", 3, "value"],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "p", 1),
                g(2),
                c(),
                c(),
                u(3, "div", 2),
                u(4, "form", 3),
                u(5, "p", 4),
                g(6, "Add Product Review"),
                c(),
                u(7, "div", 5),
                u(8, "label", 6),
                g(9, "Product Name"),
                c(),
                u(10, "select", 7),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                oe(11, VO, 2, 2, "option", 8),
                c(),
                c(),
                u(12, "div", 9),
                u(13, "label", 10),
                g(14, "Review Title"),
                c(),
                u(15, "input", 11),
                D("input", function (s) {
                  return r.reviewTitleOnChange(s);
                }),
                c(),
                c(),
                u(16, "div", 9),
                u(17, "label", 12),
                g(18, "Review"),
                c(),
                u(19, "textarea", 13),
                D("input", function (s) {
                  return r.reviewOnChange(s);
                }),
                c(),
                c(),
                u(20, "div", 5),
                u(21, "label", 12),
                g(22, "Star Ratings"),
                c(),
                u(23, "input", 14),
                D("input", function (s) {
                  return r.starCountOnChange(s);
                }),
                c(),
                c(),
                u(24, "div", 5),
                u(25, "label", 6),
                g(26, "Customer Name"),
                c(),
                u(27, "input", 15),
                D("input", function (s) {
                  return r.custNameOnChange(s);
                }),
                c(),
                c(),
                u(28, "div", 5),
                u(29, "label", 6),
                g(30, "Customer Email"),
                c(),
                u(31, "input", 16),
                D("input", function (s) {
                  return r.custEmailOnChange(s);
                }),
                c(),
                c(),
                u(32, "div", 5),
                u(33, "label", 6),
                g(34, "Customer Location"),
                c(),
                u(35, "input", 17),
                D("input", function (s) {
                  return r.custLocOnChange(s);
                }),
                c(),
                c(),
                u(36, "div", 9),
                u(37, "label", 12),
                g(38, "Admin's Reply"),
                c(),
                u(39, "textarea", 18),
                D("input", function (s) {
                  return r.adminReplyOnChange(s);
                }),
                c(),
                c(),
                u(40, "div", 5),
                u(41, "label", 6),
                g(42, "Select a file: "),
                c(),
                I(43, "input", 19),
                c(),
                u(44, "div", 20),
                u(45, "button", 21),
                D("click", function () {
                  return r.sendOnClick();
                }),
                g(46, "Send"),
                c(),
                u(47, "button", 22),
                g(48, "Cancel"),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (vn(
                    "fixed z-40 p-3 ",
                    r.msg_popup_display,
                    " transition-all ease-linear duration-500 ",
                    r.msg_popup_color,
                    " bottom-0 right-64"
                  ),
                  y(2),
                  x(r.msg_popup_msg),
                  y(9),
                  O("ngForOf", r.products));
            },
            directives: [je],
            styles: [""],
          })),
          t
        );
      })();
      function jO(t, e) {
        if ((1 & t && (u(0, "option", 42), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function UO(t, e) {
        if (1 & t) {
          const n = Rs();
          u(0, "tr"),
            u(1, "td", 40),
            g(2),
            c(),
            u(3, "td", 43),
            g(4),
            c(),
            u(5, "td", 40),
            g(6),
            c(),
            u(7, "td", 40),
            g(8),
            c(),
            u(9, "td", 40),
            g(10),
            c(),
            u(11, "td", 40),
            g(12),
            c(),
            u(13, "td", 40),
            g(14),
            c(),
            u(15, "td", 40),
            g(16),
            c(),
            u(17, "td", 40),
            g(18),
            c(),
            u(19, "td", 40),
            g(20),
            c(),
            u(21, "td", 40),
            g(22),
            c(),
            u(23, "td", 40),
            g(24),
            u(25, "form", 44),
            u(26, "input", 45),
            D("change", function (o) {
              return Wr(n), Nt().onChangeProductRevIMG(o);
            }),
            c(),
            u(27, "button", 46),
            D("click", function () {
              const s = Wr(n).$implicit;
              return Nt().onClickAddFile(s.review_id);
            }),
            g(28, "Add Image"),
            c(),
            c(),
            c(),
            c();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = Nt();
          y(2),
            x(n.review_id),
            y(2),
            x(r.selectedProductName),
            y(2),
            x(n.review_title),
            y(2),
            x(n.review),
            y(2),
            x(n.star_count),
            y(2),
            x(n.cust_name),
            y(2),
            x(n.cust_email),
            y(2),
            x(n.admin_reply),
            y(2),
            x(n.created_at),
            y(2),
            x(n.status),
            y(2),
            x(n.action),
            y(2),
            it(" ", n.img_vid, " "),
            y(1),
            B("action", r.send_img_to_URL, U);
        }
      }
      let BO = (() => {
        class t {
          constructor(n, r) {
            (this.http = n),
              (this.router = r),
              (this._url = Ce_baseURL),
              (this.more_option_logo = "../../assets/product_review_more.png"),
              (this.add_prod_display = "hidden"),
              (this.cancel_img = "../../assets/cancel.png"),
              (this.selectedProduct_pid = "1"),
              (this.clicked_review_id = ""),
              (this.selectedProductName = ""),
              (this.total_reviews = 0),
              (this.send_img_to_URL = ""),
              (this.req_data = { reviewId: "", star_count: "", custName: "" }),
              (this.refresh_icon = "../../assets/refresh.png");
          }
          reloadWithoutRfresh() {
            console.log("Refresh button pressed");
            let n = this.router.url;
            (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
              (this.router.onSameUrlNavigation = "reload"),
              this.router.navigate([n]);
          }
          fetchProductReviews() {
            return this.http
              .post(
                this._url + "getProductReview/" + this.selectedProduct_pid,
                { message: "api called" }
              )
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                (this.productReviewsData = n.rows),
                  (this.total_reviews = n.count);
              });
          }
          fetchAllProductReviews_adv(n) {
            return this.http
              .post(this._url + "getProductReview/all", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                (this.productReviewsData = r.rows),
                  (this.total_reviews = r.count);
              });
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                message: "api called",
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.productDetails = n.rows;
              });
          }
          ngOnInit() {
            this.fetchProductsDetails(), this.fetchAllProductReviews_adv({});
          }
          onClickDisplay() {
            this.add_prod_display = "block";
          }
          onClickHide() {
            this.add_prod_display = "hidden";
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              this.fetchProductReviews(),
              (this.selectedProductName =
                this.productDetails[
                  Number(this.selectedProduct_pid) - 1
                ].product_name);
          }
          inCustNameInput(n) {
            (this.req_data.custName = n.target.value),
              this.fetchAllProductReviews_adv(this.req_data);
          }
          inStarCountInput(n) {
            (this.req_data.star_count = n.target.value),
              this.fetchAllProductReviews_adv(this.req_data);
          }
          onChangeProductRevIMG(n) {}
          onClickAddFile(n) {
            (this.clicked_review_id = n),
              console.log(n),
              console.log("this.clicked_review_id: ", this.clicked_review_id),
              (this.send_img_to_URL =
                "/postProductReview_img/" + this.clicked_review_id),
              console.log("this.send_img_to_URL: ", this.send_img_to_URL);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we), T(ce));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-product-reviews"]],
            decls: 88,
            vars: 9,
            consts: [
              [1, "flex", "mt-0"],
              [
                1,
                "fixed",
                "flex-shrink-0",
                "float-left",
                "-ml-10",
                "shadow-lg",
                "md:ml-0",
              ],
              [
                1,
                "flex-shrink",
                "float-left",
                "w-full",
                "ml-2",
                "overflow-hidden",
                "md:ml-64",
              ],
              [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
              ["id", "add_product_component"],
              [1, "-ml-64"],
              [
                1,
                "absolute",
                "top-0",
                "w-5",
                "h-5",
                "m-8",
                "cursor-pointer",
                "right-64",
                3,
                "src",
                "click",
              ],
              [1, "m-36"],
              [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
              [1, "text-lg", "font-semibold", "text-gray-600"],
              [
                1,
                "absolute",
                "p-1",
                "px-2",
                "text-gray-700",
                "bg-gray-300",
                "shadow-sm",
                "top-2.5",
                "right-5",
                "flex",
                "hover:bg-opacity-50",
                "duration-300",
                "transition-all",
                3,
                "click",
              ],
              [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
              [1, "relative", "xl:p-12"],
              [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
              [
                1,
                "relative",
                "flex",
                "p-2",
                "space-x-2",
                "bg-black",
                "bg-opacity-75",
                "md:rounded-t-md",
              ],
              [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
              [
                1,
                "mt-.5",
                "text-lg",
                "font-extrabold",
                "text-gray-200",
                "uppercase",
                "md:mt-2",
                "md:text-2xl",
              ],
              [1, "absolute", "flex", "space-x-6", "md:mt-1", "right-3"],
              [
                1,
                "hidden",
                "p-1",
                "space-x-4",
                "bg-white",
                "2xl:flex",
                "bg-opacity-40",
              ],
              [
                "type",
                "file",
                "placeholder",
                "Choose a file",
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "rounded-sm",
                "outline-none",
                "text-md",
                "bg-gray-50",
              ],
              [
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "bg-yellow-400",
                "rounded-sm",
                "hover:bg-yellow-500",
                "text-md",
              ],
              [
                1,
                "hidden",
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "sm:block",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [1, "text-xl", "font-bold"],
              [1, "mx-auto", "my-2", "max-w-max", "sm:hidden"],
              [
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [
                1,
                "flex",
                "p-1",
                "mx-auto",
                "my-5",
                "space-x-4",
                "bg-white",
                "max-w-max",
                "2xl:hidden",
                "bg-opacity-40",
              ],
              [
                1,
                "block",
                "w-full",
                "p-3",
                "space-y-6",
                "bg-black",
                "bg-opacity-50",
                "2xl:space-y-0",
                "2xl:space-x-4",
                "2xl:flex",
              ],
              [
                1,
                "flex-grow",
                "space-y-2",
                "lg:space-x-3",
                "lg:space-y-0",
                "lg:flex",
              ],
              [
                "placeholder",
                "Search by Customer Name",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
                3,
                "input",
              ],
              [
                "placeholder",
                "Search by ratings",
                "type",
                "number",
                "max",
                "5",
                "min",
                "0",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
                3,
                "input",
              ],
              [
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:w-auto",
                "lg:max-w-max",
                3,
                "change",
              ],
              [3, "value", 4, "ngFor", "ngForOf"],
              [
                1,
                "flex-grow-0",
                "hidden",
                "mx-auto",
                "space-x-3",
                "sm:flex",
                "max-w-max",
              ],
              [1, "flex", "flex-row", "space-x-1"],
              [1, "text-gray-50"],
              [
                "type",
                "date",
                1,
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "w-44",
              ],
              [1, "w-full", "p-1", "my-5", "overflow-auto", "md:p-2", "lg:p-5"],
              [1, "text-sm", "font-semibold", "text-gray-500"],
              [1, "w-full"],
              [1, "bg-black", "bg-opacity-75", "text-gray-50"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
              ],
              [4, "ngFor", "ngForOf"],
              [3, "value"],
              [
                1,
                "p-1",
                "text-sm",
                "text-center",
                "text-blue-500",
                "border",
                "border-t-0",
                "border-gray-400",
                "cursor-pointer",
                "md:text-sm",
                "md:p-3",
                "hover:text-blue-600",
              ],
              [
                "enctype",
                "multipart/form-data",
                "method",
                "post",
                1,
                "mx-auto",
                "space-y-2",
                "max-w-max",
                3,
                "action",
              ],
              [
                "type",
                "file",
                "multiple",
                "",
                "name",
                "product-review-img",
                1,
                "",
                3,
                "change",
              ],
              [
                "type",
                "submit",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-black",
                "bg-yellow-400",
                "rounded-md",
                "shadow-md",
                "hover:bg-yellow-500",
                "max-w-max",
                3,
                "click",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                I(1, "app-sidebar", 1),
                u(2, "div", 2),
                u(3, "div", 3),
                u(4, "div", 4),
                u(5, "div", 5),
                u(6, "img", 6),
                D("click", function () {
                  return r.onClickHide();
                }),
                c(),
                u(7, "div", 7),
                I(8, "app-add-product-rev"),
                c(),
                c(),
                c(),
                u(9, "div", 8),
                u(10, "p", 9),
                g(11, "Home/ Products Suggestion Masters/ Product Reviews"),
                c(),
                u(12, "button", 10),
                D("click", function () {
                  return r.reloadWithoutRfresh();
                }),
                I(13, "img", 11),
                g(14, " Refresh"),
                c(),
                c(),
                u(15, "div", 12),
                u(16, "div", 13),
                u(17, "div", 14),
                I(18, "img", 15),
                u(19, "p", 16),
                g(20, "Product Reviews"),
                c(),
                u(21, "div", 17),
                u(22, "div", 18),
                I(23, "input", 19),
                u(24, "button", 20),
                g(25, "Import from CSV"),
                c(),
                c(),
                u(26, "button", 21),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(27, "span", 22),
                g(28, "+"),
                c(),
                g(29, " Add Product's Review"),
                c(),
                c(),
                c(),
                u(30, "div"),
                u(31, "div", 23),
                u(32, "button", 24),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(33, "span", 22),
                g(34, "+"),
                c(),
                g(35, " Add Product's Review"),
                c(),
                c(),
                u(36, "div", 25),
                I(37, "input", 19),
                u(38, "button", 20),
                g(39, "Import from CSV"),
                c(),
                c(),
                c(),
                u(40, "div", 26),
                u(41, "div", 27),
                u(42, "input", 28),
                D("input", function (s) {
                  return r.inCustNameInput(s);
                }),
                c(),
                u(43, "input", 29),
                D("input", function (s) {
                  return r.inStarCountInput(s);
                }),
                c(),
                u(44, "select", 30),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                u(45, "option"),
                g(46, "Choose a product"),
                c(),
                oe(47, jO, 2, 2, "option", 31),
                c(),
                c(),
                u(48, "div", 32),
                u(49, "div", 33),
                u(50, "label", 34),
                g(51, "From date: "),
                c(),
                I(52, "input", 35),
                c(),
                u(53, "div", 33),
                u(54, "label", 34),
                g(55, "To date: "),
                c(),
                I(56, "input", 35),
                c(),
                c(),
                c(),
                u(57, "div", 36),
                u(58, "p", 37),
                g(59),
                c(),
                u(60, "table", 38),
                u(61, "thead", 39),
                u(62, "th", 40),
                g(63, "Review_ID"),
                c(),
                u(64, "th", 40),
                g(65, "Product Name"),
                c(),
                u(66, "th", 40),
                g(67, "Review Title"),
                c(),
                u(68, "th", 40),
                g(69, "Review"),
                c(),
                u(70, "th", 40),
                g(71, "Star Count"),
                c(),
                u(72, "th", 40),
                g(73, "Customer Name"),
                c(),
                u(74, "th", 40),
                g(75, "Customer Email"),
                c(),
                u(76, "th", 40),
                g(77, "Admin Reply"),
                c(),
                u(78, "th", 40),
                g(79, "Created On"),
                c(),
                u(80, "th", 40),
                g(81, "Status"),
                c(),
                u(82, "th", 40),
                g(83, "Action"),
                c(),
                u(84, "th", 40),
                g(85, "Images/Videos"),
                c(),
                c(),
                u(86, "tbody"),
                oe(87, UO, 29, 13, "tr", 41),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (y(4),
                  He(
                    "",
                    r.add_prod_display,
                    " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                  ),
                  y(2),
                  B("src", r.cancel_img, U),
                  y(7),
                  B("src", r.refresh_icon, U),
                  y(5),
                  B("src", r.more_option_logo, U),
                  y(29),
                  O("ngForOf", r.productDetails),
                  y(12),
                  it("", r.total_reviews, " reviews found"),
                  y(28),
                  O("ngForOf", r.productReviewsData));
            },
            directives: [gt, Lf, je],
            styles: [""],
          })),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function HO(t, e) {
        if (
          (1 & t &&
            (u(0, "div"),
            u(1, "div", 2),
            u(2, "p"),
            g(3),
            c(),
            u(4, "p"),
            g(5),
            c(),
            c(),
            u(6, "div", 3),
            I(7, "img", 4),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          He(
            "relative flex p-1 m-4 transition-all duration-300 rounded-md shadow-sm cursor-pointer h-24 hover:bg-opacity-70  ",
            n.cat_bg_col,
            " w-80"
          ),
            y(2),
            He(
              "h-full p-2 text-md md:text-lg font-bold tracking-wider ",
              n.cat_num_col,
              " uppercase "
            ),
            y(1),
            x(n.cat_num),
            y(1),
            He(
              "flex-grow pb-2 text-md  font-semibold text-center ",
              n.cat_text_col,
              ""
            ),
            y(1),
            x(n.cat_name),
            y(2),
            B("src", n.cat_img, U);
        }
      }
      let $O = (() => {
          class t {
            constructor(n) {
              (this.http = n),
                (this._url = Ce_baseURL),
                (this.category_list = [
                  {
                    cat_name: "Total Users",
                    cat_num: 0,
                    cat_img: "../../assets/category_user.png",
                    cat_bg_col: "bg-green-500",
                    cat_text_col: "text-white",
                    cat_num_col: "text-white",
                  },
                  {
                    cat_name: "Total Products",
                    cat_num: 0,
                    cat_img: "../../assets/category_products.png",
                    cat_bg_col: "bg-pink-600",
                    cat_text_col: "text-white",
                    cat_num_col: "text-white",
                  },
                  {
                    cat_name: "Total Customers",
                    cat_num: "?",
                    cat_img: "../../assets/category_customer.png",
                    cat_bg_col: "bg-blue-600",
                    cat_text_col: "text-white",
                    cat_num_col: "text-white",
                  },
                  {
                    cat_name: "Total QR Generated",
                    cat_num: "?",
                    cat_img: "../../assets/sidebar_qr-code.png",
                    cat_bg_col: "bg-black",
                    cat_text_col: "text-white",
                    cat_num_col: "text-white",
                  },
                  {
                    cat_name: "Total QR scanned",
                    cat_num: "?",
                    cat_img: "../../assets/category_scanned.png",
                    cat_bg_col: "bg-purple-600",
                    cat_text_col: "text-white",
                    cat_num_col: "text-white",
                  },
                  {
                    cat_name: "Total Suspicious QR Scanned",
                    cat_num: "?",
                    cat_img: "../../assets/category_warning.png",
                    cat_bg_col: "bg-yellow-400",
                    cat_text_col: "text-white",
                    cat_num_col: "text-white",
                  },
                  {
                    cat_name: "Total Credited Rewards Points",
                    cat_num: "?",
                    cat_img: "../../assets/category_rewards_wallet.png",
                    cat_bg_col: "bg-black",
                    cat_text_col: "text-green-300",
                    cat_num_col: "text-green-300",
                  },
                  {
                    cat_name: "Total Credit/ActiveRewards Points",
                    cat_num: "?",
                    cat_img: "../../assets/category_increasing.png",
                    cat_bg_col: "bg-black",
                    cat_text_col: "text-green-300",
                    cat_num_col: "text-green-300",
                  },
                  {
                    cat_name: "Total Debit/Inactive Reward Points",
                    cat_num: "?",
                    cat_img: "../../assets/category_decreasing.png",
                    cat_bg_col: "bg-black",
                    cat_text_col: "text-green-300",
                    cat_num_col: "text-green-300",
                  },
                ]);
            }
            fetchUserMasterData() {
              return this.http
                .post(this._url + "getUserMaster/all", {
                  statuscode: 200,
                  success: !0,
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.category_list[0].cat_num = n.count),
                    (this.userMasterData = n.rows);
                });
            }
            fetchProductsDetails() {
              return this.http
                .post(this._url + "getProductsMaster/all", {
                  statuscode: 200,
                  success: !0,
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.category_list[1].cat_num = n.count),
                    (this.productDetails = n.rows);
                });
            }
            ngOnInit() {
              this.fetchProductsDetails(), this.fetchUserMasterData();
            }
            updateDataOfCards() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-collapsed-card"]],
              decls: 2,
              vars: 1,
              consts: [
                [1, "flex", "flex-wrap"],
                [3, "class", 4, "ngFor", "ngForOf"],
                [
                  1,
                  "flex",
                  "flex-col",
                  "w-full",
                  "mx-.5",
                  "md:px-1",
                  "max-w-max",
                ],
                [1, "right-0", "flex-grow", "h-full", "px-5", "pt-3"],
                [1, "float-right", "w-12", "h-12", 3, "src"],
              ],
              template: function (n, r) {
                1 & n && (u(0, "div", 0), oe(1, HO, 8, 12, "div", 1), c()),
                  2 & n && (y(1), O("ngForOf", r.category_list));
              },
              directives: [je],
              styles: [""],
            })),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        qO = (() => {
          class t {
            constructor(n) {
              (this.router = n),
                (this.refresh_icon = "../../assets/refresh.png");
            }
            reloadWithoutRfresh() {
              console.log("Refresh button pressed");
              let n = this.router.url;
              (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
                (this.router.onSameUrlNavigation = "reload"),
                this.router.navigate([n]);
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-dashboard"]],
              decls: 12,
              vars: 1,
              consts: [
                [
                  1,
                  "flex",
                  "h-screen",
                  "mt-0",
                  "overflow-y-auto",
                  "bg-gradient-to-b",
                  "from-gray-300",
                  "to-gray-100",
                ],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "block",
                  "float-left",
                  "shadow-lg",
                ],
                [
                  1,
                  "flex-shrink",
                  "float-left",
                  "w-full",
                  "overflow-auto",
                  "ml-14",
                  "md:ml-64",
                ],
                [1, ""],
                [1, "relative", "w-full", "p-1", "py-3", "bg-gray-100"],
                [1, "text-lg", "font-semibold", "text-gray-600"],
                [
                  1,
                  "absolute",
                  "p-1",
                  "px-2",
                  "text-gray-700",
                  "bg-gray-300",
                  "shadow-sm",
                  "top-2.5",
                  "right-5",
                  "flex",
                  "hover:bg-opacity-50",
                  "duration-300",
                  "transition-all",
                  3,
                  "click",
                ],
                [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
                [1, "space-y-16"],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  I(1, "app-sidebar", 1),
                  u(2, "div", 2),
                  u(3, "div", 3),
                  u(4, "div", 4),
                  u(5, "p", 5),
                  g(6, "Home/ Dashboard"),
                  c(),
                  u(7, "button", 6),
                  D("click", function () {
                    return r.reloadWithoutRfresh();
                  }),
                  I(8, "img", 7),
                  g(9, " Refresh"),
                  c(),
                  c(),
                  u(10, "div", 8),
                  I(11, "app-collapsed-card"),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n && (y(8), B("src", r.refresh_icon, U));
              },
              directives: [gt, $O],
              styles: [""],
            })),
            t
          );
        })();
      function Nv(t, e, n, r, o, s, i) {
        try {
          var a = t[s](i),
            l = a.value;
        } catch (d) {
          return void n(d);
        }
        a.done ? e(l) : Promise.resolve(l).then(r, o);
      }
      function Vf(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (r, o) {
            var s = t.apply(e, n);
            function i(l) {
              Nv(s, r, o, i, a, "next", l);
            }
            function a(l) {
              Nv(s, r, o, i, a, "throw", l);
            }
            i(void 0);
          });
        };
      }
      let WO = (() => {
        class t {
          constructor(n) {
            (this.http = n),
              (this._url = Ce_baseURL),
              (this.msg_popup_display = "hidden"),
              (this.msg_popup_msg = ""),
              (this.msg_popup_color = ""),
              (this.userData = {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                contact_no: "",
                created_at: "",
                updated_at: "",
              });
          }
          userF_NameOnChange(n) {
            this.userData.first_name = n.target.value;
          }
          userL_NameOnChange(n) {
            this.userData.last_name = n.target.value;
          }
          userEmailOnChange(n) {
            this.userData.email = n.target.value;
          }
          userContact_noOnChange(n) {
            this.userData.contact_no = n.target.value;
          }
          userPasswordOnChange(n) {
            this.userData.password = n.target.value;
          }
          sendUserDetails() {
            return this.http
              .post(this._url + "addUser", this.userData)
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).result;
                })
              )
              .subscribe(
                (n) => {
                  (this.API_result = n),
                    (this.msg_popup_color = "bg-green-700"),
                    (this.msg_popup_msg = "Uesr added successfully"),
                    (this.msg_popup_display = "block");
                },
                (n) => {
                  (this.msg_popup_color = "bg-red-700"),
                    (this.msg_popup_msg = n.error.data),
                    (this.msg_popup_display = "block");
                }
              );
          }
          sendOnClick() {
            var n = this;
            return Vf(function* () {
              const r = new Date(),
                o_year = r.getFullYear(),
                o_month = r.getMonth(),
                o_date = r.getDate(),
                o_hours = r.getHours(),
                o_min = r.getMinutes(),
                o_sec = r.getSeconds();
              (n.userData.created_at = `${o_date}-${
                o_month + 1
              }-${o_year} ${o_hours}:${o_min}:${o_sec}`),
                (n.userData.updated_at = `${o_date}-${
                  o_month + 1
                }-${o_year} ${o_hours}:${o_min}:${o_sec}`),
                n.sendUserDetails();
            })();
          }
          ngOnInit() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-add-user"]],
            decls: 32,
            vars: 5,
            consts: [
              ["id", "msg_popup"],
              [1, "text-gray-50"],
              [
                1,
                "mx-auto",
                "bg-white",
                "border-2",
                "border-gray-200",
                "max-w-max",
              ],
              [
                "id",
                "add-user-form",
                1,
                "relative",
                "space-y-8",
                "bg-gray-200",
                "rounded-md",
                "p-7",
              ],
              [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
              [1, "space-x-6"],
              [1, "mt-6", "text-lg", "text-gray-900", "w-36"],
              [
                "max",
                "5",
                "min",
                "1",
                "placeholder",
                "Enter user first_name",
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "max",
                "5",
                "min",
                "1",
                "placeholder",
                "Enter user last_name",
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [1, "text-lg", "text-gray-900", "w-36"],
              [
                "placeholder",
                "Give user email",
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "type",
                "number",
                "maxlength",
                "10",
                "placeholder",
                "Give user contact_no",
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "type",
                "password",
                "placeholder",
                "Give user password",
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
              [
                "type",
                "button",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-green-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-green-700",
                3,
                "click",
              ],
              [
                "type",
                "",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-gray-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-gray-500",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "p", 1),
                g(2),
                c(),
                c(),
                u(3, "div", 2),
                u(4, "form", 3),
                u(5, "p", 4),
                g(6, "Add User"),
                c(),
                u(7, "div", 5),
                u(8, "label", 6),
                g(9, "First Name"),
                c(),
                u(10, "input", 7),
                D("input", function (s) {
                  return r.userF_NameOnChange(s);
                }),
                c(),
                c(),
                u(11, "div", 5),
                u(12, "label", 6),
                g(13, "Last Name"),
                c(),
                u(14, "input", 8),
                D("input", function (s) {
                  return r.userL_NameOnChange(s);
                }),
                c(),
                c(),
                u(15, "div", 5),
                u(16, "label", 9),
                g(17, "Email"),
                c(),
                u(18, "input", 10),
                D("input", function (s) {
                  return r.userEmailOnChange(s);
                }),
                c(),
                c(),
                u(19, "div", 5),
                u(20, "label", 9),
                g(21, "Contact No."),
                c(),
                u(22, "input", 11),
                D("input", function (s) {
                  return r.userContact_noOnChange(s);
                }),
                c(),
                c(),
                u(23, "div", 5),
                u(24, "label", 9),
                g(25, "Password"),
                c(),
                u(26, "input", 12),
                D("input", function (s) {
                  return r.userPasswordOnChange(s);
                }),
                c(),
                c(),
                u(27, "div", 13),
                u(28, "button", 14),
                D("click", function () {
                  return r.sendOnClick();
                }),
                g(29, "Send"),
                c(),
                u(30, "button", 15),
                g(31, "Cancel"),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (vn(
                    "fixed z-40 p-3 ",
                    r.msg_popup_display,
                    " transition-all ease-linear duration-500 ",
                    r.msg_popup_color,
                    " bottom-0 right-64"
                  ),
                  y(2),
                  x(r.msg_popup_msg));
            },
            styles: [""],
          })),
          (t.ɵprov = F({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function zO(t, e) {
        if (
          (1 & t &&
            (u(0, "tr", 26),
            u(1, "td", 27),
            g(2),
            c(),
            u(3, "td", 27),
            g(4),
            c(),
            u(5, "td", 27),
            g(6),
            c(),
            u(7, "td", 27),
            g(8),
            c(),
            u(9, "td", 27),
            g(10),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2),
            x(n.user_id),
            y(2),
            Tc("", n.first_name, " ", n.last_name, ""),
            y(2),
            x(n.contact_no),
            y(2),
            x(n.email),
            y(2),
            x(n.status);
        }
      }
      let GO = (() => {
          class t {
            constructor(n, r) {
              (this.http = n),
                (this.router = r),
                (this._url = Ce_baseURL),
                (this.more_option_logo =
                  "../../assets/product_review_more.png"),
                (this.add_user_display = "hidden"),
                (this.cancel_img = "../../../assets/cancel.png"),
                (this.total_users = Number),
                (this.refresh_icon = "../../assets/refresh.png");
            }
            reloadWithoutRfresh() {
              console.log("Refresh button pressed");
              let n = this.router.url;
              (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
                (this.router.onSameUrlNavigation = "reload"),
                this.router.navigate([n]);
            }
            fetchUserMasterData() {
              return this.http
                .post(this._url + "getUserMaster/all", {
                  statuscode: 200,
                  success: !0,
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.userMasterData = n.rows), (this.total_users = n.count);
                });
            }
            ngOnInit() {
              this.fetchUserMasterData();
            }
            onClickDisplay() {
              this.add_user_display = "block";
            }
            onClickHide() {
              this.add_user_display = "hidden";
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we), T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-user-master"]],
              decls: 43,
              vars: 8,
              consts: [
                [1, "flex", "mt-0"],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "float-left",
                  "-ml-10",
                  "shadow-lg",
                  "md:ml-0",
                ],
                [
                  1,
                  "flex-shrink",
                  "float-left",
                  "w-full",
                  "ml-2",
                  "overflow-hidden",
                  "md:ml-64",
                ],
                [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
                ["id", "add_user_component"],
                [1, "-ml-64"],
                [
                  1,
                  "absolute",
                  "top-0",
                  "w-5",
                  "h-5",
                  "m-8",
                  "cursor-pointer",
                  "right-64",
                  3,
                  "src",
                  "click",
                ],
                [1, "m-36"],
                [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
                [1, "text-lg", "font-semibold", "text-gray-600"],
                [
                  1,
                  "absolute",
                  "p-1",
                  "px-2",
                  "text-gray-700",
                  "bg-gray-300",
                  "shadow-sm",
                  "top-2.5",
                  "right-5",
                  "flex",
                  "hover:bg-opacity-50",
                  "duration-300",
                  "transition-all",
                  3,
                  "click",
                ],
                [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
                [1, "relative", "xl:p-12"],
                [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
                [
                  1,
                  "relative",
                  "flex",
                  "p-2",
                  "space-x-2",
                  "bg-black",
                  "bg-opacity-75",
                  "md:rounded-t-md",
                ],
                [1, "w-12", "h-12", 3, "src"],
                [
                  1,
                  "mt-2",
                  "text-2xl",
                  "font-extrabold",
                  "text-gray-200",
                  "uppercase",
                ],
                [1, "absolute", "flex", "mt-1", "space-x-6", "right-3"],
                [
                  1,
                  "p-1",
                  "transition-all",
                  "duration-300",
                  "bg-green-400",
                  "rounded-sm",
                  "hover:bg-green-500",
                  "text-md",
                  3,
                  "click",
                ],
                [1, "text-xl", "font-bold"],
                [
                  1,
                  "w-full",
                  "p-1",
                  "my-5",
                  "overflow-auto",
                  "md:p-2",
                  "lg:p-5",
                ],
                [1, "text-sm", "italic", "font-semibold", "text-gray-500"],
                [1, "w-full"],
                [1, "bg-black", "bg-opacity-75", "text-gray-50"],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "border",
                  "border-b-0",
                  "border-gray-400",
                  "md:text-base",
                  "md:p-4",
                ],
                ["class", "hover:bg-gray-200", 4, "ngFor", "ngForOf"],
                [1, "hover:bg-gray-200"],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "text-center",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "md:text-sm",
                  "md:p-3",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  I(1, "app-sidebar", 1),
                  u(2, "div", 2),
                  u(3, "div", 3),
                  u(4, "div", 4),
                  u(5, "div", 5),
                  u(6, "img", 6),
                  D("click", function () {
                    return r.onClickHide();
                  }),
                  c(),
                  u(7, "div", 7),
                  I(8, "app-add-user"),
                  c(),
                  c(),
                  c(),
                  u(9, "div", 8),
                  u(10, "p", 9),
                  g(11, "Masters/ Users"),
                  c(),
                  u(12, "button", 10),
                  D("click", function () {
                    return r.reloadWithoutRfresh();
                  }),
                  I(13, "img", 11),
                  g(14, " Refresh"),
                  c(),
                  c(),
                  u(15, "div", 12),
                  u(16, "div", 13),
                  u(17, "div", 14),
                  I(18, "img", 15),
                  u(19, "p", 16),
                  g(20, "Users"),
                  c(),
                  u(21, "div", 17),
                  u(22, "button", 18),
                  D("click", function () {
                    return r.onClickDisplay();
                  }),
                  u(23, "span", 19),
                  g(24, "+"),
                  c(),
                  g(25, " Add User"),
                  c(),
                  c(),
                  c(),
                  u(26, "div", 20),
                  u(27, "p", 21),
                  g(28),
                  c(),
                  u(29, "table", 22),
                  u(30, "thead", 23),
                  u(31, "th", 24),
                  g(32, "user_id"),
                  c(),
                  u(33, "th", 24),
                  g(34, "User Name"),
                  c(),
                  u(35, "th", 24),
                  g(36, "Contact Number"),
                  c(),
                  u(37, "th", 24),
                  g(38, "Email"),
                  c(),
                  u(39, "th", 24),
                  g(40, "Status"),
                  c(),
                  c(),
                  u(41, "tbody"),
                  oe(42, zO, 11, 6, "tr", 25),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (y(4),
                    He(
                      "",
                      r.add_user_display,
                      " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                    ),
                    y(2),
                    B("src", r.cancel_img, U),
                    y(7),
                    B("src", r.refresh_icon, U),
                    y(5),
                    B("src", r.more_option_logo, U),
                    y(10),
                    it("", r.total_users, " user/s found "),
                    y(14),
                    O("ngForOf", r.userMasterData));
              },
              directives: [gt, WO, je],
              styles: [""],
            })),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        QO = (() => {
          class t {
            constructor(n, r) {
              (this.http = n),
                (this.router = r),
                (this._url = Ce_baseURL),
                (this.login_logo = "../../assets/login_logo.png"),
                (this.email_input = ""),
                (this.password_input = ""),
                (this.response_msg = ""),
                (this.response_json = {}),
                (this.user_FnC = !1),
                (this.user_name = ""),
                (this.user_email = "");
            }
            fetchUserDetails() {
              return this.http
                .post(this._url + "getUserMaster/email/" + this.email_input, {
                  message: "request sent to server",
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.user_name = n.first_name),
                    (this.user_email = n.email),
                    (document.cookie = "user_name=" + this.user_name),
                    (document.cookie = "user_email=" + this.user_email),
                    console.log("user_name=" + this.user_name);
                });
            }
            authAPI() {
              return this.http
                .post(this._url + "auth", {
                  email: this.email_input,
                  password: this.password_input,
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r);
                  })
                )
                .subscribe((n) => {
                  (this.response_json = n),
                    (this.response_msg = n.result[0].message),
                    (this.user_FnC = n.result[0].user_confirmation),
                    null != n.result[1] &&
                      (document.cookie =
                        "auth_token=" + n.result[1].auth_token),
                    !0 === n.result[0].user_confirmation &&
                      this.router.navigate(["/dashboard"]);
                });
            }
            onChangeEmailInput(n) {
              this.email_input = n.target.value;
            }
            onChangePasswdInput(n) {
              this.password_input = n.target.value;
            }
            inputValidation() {
              this.email_input
                ? this.password_input
                  ? this.password_input.length < 8
                    ? (this.response_msg =
                        "Password must have 8 characters or more")
                    : ((this.response_msg = ""),
                      this.authAPI(),
                      this.fetchUserDetails())
                  : (this.response_msg = "Provide password")
                : (this.response_msg = "Provide Email Address");
            }
            onClickLogin() {
              this.inputValidation();
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we), T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-login"]],
              decls: 21,
              vars: 2,
              consts: [
                [
                  1,
                  "fixed",
                  "top-0",
                  "overflow-auto",
                  "md:h-screen",
                  "md:w-screen",
                  "bg-gray-50",
                  "no-scrollbar",
                  "md:pt-40",
                  "lg:pt-64",
                  "xl:pt-72",
                ],
                [
                  1,
                  "w-screen",
                  "h-screen",
                  "mx-auto",
                  "bg-black",
                  "shadow-xl",
                  "md:rounded-md",
                  "md:h-auto",
                  "bg-opacity-90",
                  "md:bg-opacity-100",
                  "md:bg-white",
                  "md:flex",
                  "md:w-auto",
                  "md:max-w-max",
                ],
                [
                  1,
                  "w-full",
                  "p-8",
                  "space-y-6",
                  "bg-transparent",
                  "md:bg-black",
                  "md:w-96",
                  "md:bg-opacity-90",
                ],
                [1, "p-4", "md:hidden"],
                [
                  1,
                  "text-5xl",
                  "font-extrabold",
                  "text-center",
                  "text-gray-300",
                ],
                [1, "pt-12", "space-y-6", "md:pt-0"],
                [1, "space-y-2"],
                [1, "text-3xl", "font-medium", "text-gray-50"],
                [1, "text-sm", "font-medium", "text-gray-400"],
                [1, "text-sm", "font-medium", "text-red-500"],
                [1, "space-y-3"],
                [
                  "type",
                  "email",
                  "placeholder",
                  "Enter Email",
                  1,
                  "w-full",
                  "p-1",
                  "text-base",
                  "placeholder-gray-300",
                  "bg-white",
                  "outline-none",
                  "text-gray-50",
                  "bg-opacity-40",
                  3,
                  "change",
                ],
                [
                  "type",
                  "password",
                  "placeholder",
                  "Enter Password",
                  1,
                  "w-full",
                  "p-1",
                  "text-base",
                  "placeholder-gray-300",
                  "bg-white",
                  "outline-none",
                  "text-gray-50",
                  "bg-opacity-40",
                  3,
                  "change",
                ],
                [
                  "type",
                  "button",
                  1,
                  "p-2",
                  "px-4",
                  "text-lg",
                  "font-bold",
                  "text-center",
                  "transition-all",
                  "duration-300",
                  "bg-green-700",
                  "rounded-md",
                  "cursor-pointer",
                  "select-none",
                  "hover:bg-green-600",
                  "text-gray-50",
                  3,
                  "click",
                ],
                [1, "hidden", "h-full", "bg-white", "w-96", "md:block"],
                [1, "mx-auto", "pt-28", 3, "src"],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  u(1, "div", 1),
                  u(2, "div", 2),
                  u(3, "div", 3),
                  u(4, "p", 4),
                  g(5, "Urban Yog"),
                  c(),
                  c(),
                  u(6, "div", 5),
                  u(7, "div", 6),
                  u(8, "p", 7),
                  g(9, "Login"),
                  c(),
                  u(10, "p", 8),
                  g(11, "Sign in to your account"),
                  c(),
                  u(12, "p", 9),
                  g(13),
                  c(),
                  c(),
                  u(14, "div", 10),
                  u(15, "input", 11),
                  D("change", function (s) {
                    return r.onChangeEmailInput(s);
                  }),
                  c(),
                  u(16, "input", 12),
                  D("change", function (s) {
                    return r.onChangePasswdInput(s);
                  }),
                  c(),
                  c(),
                  u(17, "button", 13),
                  D("click", function () {
                    return r.onClickLogin();
                  }),
                  g(18, "Login"),
                  c(),
                  c(),
                  c(),
                  u(19, "div", 14),
                  I(20, "img", 15),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (y(13), x(r.response_msg), y(7), B("src", r.login_logo, U));
              },
              styles: [""],
            })),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        JO = (() => {
          class t {
            constructor(n) {
              (this.http = n),
                (this._url = Ce_baseURL),
                (this.msg_popup_display = "hidden"),
                (this.msg_popup_msg = ""),
                (this.msg_popup_color = ""),
                (this.postData = {
                  product_id: "",
                  product_name: "",
                  product_handle: "",
                  product_category: "",
                  product_img_url: "",
                  store_name: "",
                  created_at: "",
                  updated_at: "",
                });
            }
            productIDOnChange(n) {
              this.postData.product_id = n.target.value;
            }
            productIMGOnChange(n) {
              this.postData.product_img_url = n.target.value;
            }
            productNameOnChange(n) {
              this.postData.product_name = n.target.value;
            }
            productHandleOnChange(n) {
              this.postData.product_handle = n.target.value;
            }
            productCategoryOnChange(n) {
              this.postData.product_category = n.target.value;
            }
            productStoreOnChange(n) {
              this.postData.store_name = n.target.value;
            }
            sendProductsDetails() {
              return this.http
                .post(this._url + "addProduct", this.postData)
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).result;
                  })
                )
                .subscribe(
                  (n) => {
                    (this.API_result = n),
                      (this.msg_popup_color = "bg-green-700"),
                      (this.msg_popup_msg = "Product added successfully"),
                      (this.msg_popup_display = "block");
                  },
                  (n) => {
                    (this.msg_popup_color = "bg-red-700"),
                      (this.msg_popup_msg = n.error.data),
                      (this.msg_popup_display = "block");
                  }
                );
            }
            sendOnClick() {
              const n = new Date(),
                r_year = n.getFullYear(),
                r_month = n.getMonth(),
                r_date = n.getDate(),
                r_hours = n.getHours(),
                r_min = n.getMinutes(),
                r_sec = n.getSeconds();
              (this.postData.created_at = `${r_date}-${
                r_month + 1
              }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
                (this.postData.updated_at = `${r_date}-${
                  r_month + 1
                }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
                this.sendProductsDetails();
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-add-product"]],
              decls: 36,
              vars: 5,
              consts: [
                ["id", "msg_popup"],
                [1, "text-gray-50"],
                [1, "mx-auto", "bg-white", "max-w-max"],
                [
                  1,
                  "relative",
                  "p-10",
                  "space-y-8",
                  "bg-gray-100",
                  "rounded-md",
                ],
                [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
                [1, "flex", "flex-row", "space-x-6"],
                [1, "mt-3", "text-lg", "text-gray-900", "w-36"],
                [
                  "type",
                  "number",
                  "placeholder",
                  "Enter product_id",
                  1,
                  "float-right",
                  "p-2",
                  "text-lg",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [
                  "placeholder",
                  "Enter product_img_url",
                  1,
                  "float-right",
                  "p-2",
                  "text-lg",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [1, "space-x-6"],
                [1, "mt-6", "text-lg", "text-gray-900", "w-36"],
                [
                  "max",
                  "5",
                  "min",
                  "1",
                  "placeholder",
                  "Enter product_name",
                  1,
                  "float-right",
                  "p-2",
                  "text-lg",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [
                  "placeholder",
                  "Give Product's Handles...",
                  1,
                  "float-right",
                  "p-2",
                  "text-lg",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [1, "text-lg", "text-gray-900", "w-36"],
                [
                  "placeholder",
                  "Give Product's Category",
                  1,
                  "float-right",
                  "p-2",
                  "text-lg",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [
                  "placeholder",
                  "Give Store name",
                  1,
                  "float-right",
                  "p-2",
                  "text-lg",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
                [
                  "type",
                  "button",
                  1,
                  "p-1",
                  "px-3",
                  "text-lg",
                  "text-white",
                  "transition-all",
                  "duration-300",
                  "bg-green-800",
                  "rounded-sm",
                  "outline-none",
                  "cursor-pointer",
                  "hover:bg-green-700",
                  3,
                  "click",
                ],
                [
                  "type",
                  "",
                  1,
                  "p-1",
                  "px-3",
                  "text-lg",
                  "text-white",
                  "transition-all",
                  "duration-300",
                  "bg-gray-800",
                  "rounded-sm",
                  "outline-none",
                  "cursor-pointer",
                  "hover:bg-gray-500",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  u(1, "p", 1),
                  g(2),
                  c(),
                  c(),
                  u(3, "div", 2),
                  u(4, "form", 3),
                  u(5, "p", 4),
                  g(6, "Add Product"),
                  c(),
                  u(7, "div", 5),
                  u(8, "label", 6),
                  g(9, "Shopify Product ID"),
                  c(),
                  u(10, "input", 7),
                  D("input", function (s) {
                    return r.productIDOnChange(s);
                  }),
                  c(),
                  c(),
                  u(11, "div", 5),
                  u(12, "label", 6),
                  g(13, "Product image URL"),
                  c(),
                  u(14, "input", 8),
                  D("input", function (s) {
                    return r.productIMGOnChange(s);
                  }),
                  c(),
                  c(),
                  u(15, "div", 9),
                  u(16, "label", 10),
                  g(17, "Product Name"),
                  c(),
                  u(18, "input", 11),
                  D("input", function (s) {
                    return r.productNameOnChange(s);
                  }),
                  c(),
                  c(),
                  u(19, "div", 5),
                  u(20, "label", 10),
                  g(21, "Product Handle"),
                  c(),
                  u(22, "textarea", 12),
                  D("input", function (s) {
                    return r.productHandleOnChange(s);
                  }),
                  c(),
                  c(),
                  u(23, "div", 9),
                  u(24, "label", 13),
                  g(25, "Product Category"),
                  c(),
                  u(26, "input", 14),
                  D("input", function (s) {
                    return r.productCategoryOnChange(s);
                  }),
                  c(),
                  c(),
                  u(27, "div", 9),
                  u(28, "label", 13),
                  g(29, "Store"),
                  c(),
                  u(30, "input", 15),
                  D("input", function (s) {
                    return r.productStoreOnChange(s);
                  }),
                  c(),
                  c(),
                  u(31, "div", 16),
                  u(32, "button", 17),
                  D("click", function () {
                    return r.sendOnClick();
                  }),
                  g(33, "Send"),
                  c(),
                  u(34, "button", 18),
                  g(35, "Cancel"),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (vn(
                      "fixed z-40 p-3 ",
                      r.msg_popup_display,
                      " transition-all ease-linear duration-500 ",
                      r.msg_popup_color,
                      " bottom-0 right-64"
                    ),
                    y(2),
                    x(r.msg_popup_msg));
              },
              styles: [""],
            })),
            t
          );
        })();
      function KO(t, e) {
        if ((1 & t && (u(0, "option", 38), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n), y(1), x(n);
        }
      }
      function YO(t, e) {
        if (
          (1 & t &&
            (u(0, "tr", 39),
            u(1, "td", 36),
            g(2),
            c(),
            u(3, "td", 40),
            I(4, "img", 41),
            c(),
            u(5, "td", 36),
            g(6),
            c(),
            u(7, "td", 36),
            g(8),
            c(),
            u(9, "td", 36),
            g(10),
            c(),
            u(11, "td", 36),
            g(12),
            c(),
            u(13, "td", 36),
            g(14),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2),
            x(n.pid),
            y(2),
            B("src", n.product_img_url, U),
            y(2),
            x(n.product_name),
            y(2),
            x(n.product_handle),
            y(2),
            x(n.product_category),
            y(2),
            x(n.created_at),
            y(2),
            x(n.updated_at);
        }
      }
      let ZO = (() => {
          class t {
            constructor(n, r) {
              (this.http = n),
                (this.router = r),
                (this._url = Ce_baseURL),
                (this.more_option_logo =
                  "../../assets/product_review_more.png"),
                (this.add_prod_display = "hidden"),
                (this.cancel_img = "../../assets/cancel.png"),
                (this.total_products = Xa),
                (this.selectedCategory = ""),
                (this.category_list = [
                  "Beard Care",
                  "Combo",
                  "Body Care",
                  "Hair Care",
                  "Face Care",
                  "Hair Styling, Hair Care",
                  "Fashion",
                  "singeleton_gift",
                ]),
                (this.input_prod_name = ""),
                (this.req_body = { prod_name: "", prod_cat: "" }),
                (this.refresh_icon = "../../assets/refresh.png");
            }
            reloadWithoutRfresh() {
              console.log("Refresh button pressed");
              let n = this.router.url;
              (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
                (this.router.onSameUrlNavigation = "reload"),
                this.router.navigate([n]);
            }
            fetchProductsDetails() {
              return this.http
                .post(this._url + "getProductsMaster/all", {
                  message: "api called fro all prod",
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.productDetails = n.rows),
                    (this.total_products = n.count);
                });
            }
            fetchProductsDetails_adv(n) {
              return this.http
                .post(this._url + "getProductsMaster/all", n)
                .pipe(
                  P((r) => {
                    const o = JSON.stringify(r);
                    return JSON.parse(o).data;
                  })
                )
                .subscribe((r) => {
                  (this.productDetails = r.rows),
                    (this.total_products = r.count);
                });
            }
            onChange_Prod_SearchInput(n) {
              (this.input_prod_name = n.target.value),
                (this.req_body.prod_name = this.input_prod_name),
                console.log(this.req_body),
                this.req_body.prod_name
                  ? this.fetchProductsDetails_adv(this.req_body)
                  : this.fetchProductsDetails();
            }
            onSelectProductCategoryDropdown(n) {
              (this.selectedCategory = n.target.value),
                console.log(
                  "User want data to be sorted by categories by category: ",
                  this.selectedCategory
                ),
                (this.req_body.prod_cat = this.selectedCategory),
                console.log(this.req_body),
                "Choose a category" === this.selectedCategory
                  ? this.fetchProductsDetails()
                  : this.fetchProductsDetails_adv(this.req_body);
            }
            ngOnInit() {
              this.fetchProductsDetails();
            }
            onClickDisplay() {
              this.add_prod_display = "block";
            }
            onClickHide() {
              this.add_prod_display = "hidden";
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we), T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-product-master"]],
              decls: 68,
              vars: 9,
              consts: [
                [1, "flex", "mt-0"],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "float-left",
                  "-ml-10",
                  "shadow-lg",
                  "md:ml-0",
                ],
                [
                  1,
                  "flex-shrink",
                  "float-left",
                  "w-full",
                  "ml-2",
                  "overflow-hidden",
                  "md:ml-64",
                ],
                [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
                ["id", "add_product_component"],
                [1, "-ml-64"],
                [
                  1,
                  "absolute",
                  "top-0",
                  "w-5",
                  "h-5",
                  "m-8",
                  "cursor-pointer",
                  "right-64",
                  3,
                  "src",
                  "click",
                ],
                [1, "m-36"],
                [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
                [1, "text-lg", "font-semibold", "text-gray-600"],
                [
                  1,
                  "absolute",
                  "p-1",
                  "px-2",
                  "text-gray-700",
                  "bg-gray-300",
                  "shadow-sm",
                  "top-2.5",
                  "right-5",
                  "flex",
                  "hover:bg-opacity-50",
                  "duration-300",
                  "transition-all",
                  3,
                  "click",
                ],
                [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
                [1, "relative", "xl:p-12"],
                [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
                [
                  1,
                  "relative",
                  "flex",
                  "p-2",
                  "space-x-2",
                  "bg-black",
                  "bg-opacity-75",
                  "md:rounded-t-md",
                ],
                [1, "w-12", "h-12", 3, "src"],
                [
                  1,
                  "mt-2",
                  "text-2xl",
                  "font-extrabold",
                  "text-gray-200",
                  "uppercase",
                ],
                [
                  1,
                  "absolute",
                  "flex",
                  "mt-1",
                  "space-x-2",
                  "md:space-x-6",
                  "right-3",
                ],
                [
                  1,
                  "hidden",
                  "p-1",
                  "text-sm",
                  "transition-all",
                  "duration-300",
                  "bg-yellow-400",
                  "rounded-sm",
                  "hover:bg-yellow-500",
                  "lg:block",
                  "md:text-md",
                ],
                [
                  1,
                  "p-1",
                  "text-sm",
                  "transition-all",
                  "duration-300",
                  "bg-green-400",
                  "rounded-sm",
                  "hover:bg-green-500",
                  "md:text-md",
                  3,
                  "click",
                ],
                [1, "text-base", "font-bold", "md:text-xl"],
                [1, "mx-auto", "my-5", "lg:hidden", "max-w-max"],
                [
                  1,
                  "p-1",
                  "text-sm",
                  "transition-all",
                  "duration-300",
                  "bg-yellow-400",
                  "rounded-sm",
                  "hover:bg-yellow-500",
                  "md:text-md",
                ],
                [
                  1,
                  "hidden",
                  "w-full",
                  "p-3",
                  "space-y-6",
                  "bg-black",
                  "bg-opacity-50",
                  "xl:space-y-0",
                  "xl:space-x-4",
                  "md:block",
                  "xl:flex",
                ],
                [1, "flex", "flex-grow", "space-x-3"],
                [
                  "placeholder",
                  "Search for product",
                  1,
                  "flex-grow",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  3,
                  "input",
                ],
                [
                  1,
                  "hidden",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "md:block",
                  "max-w-max",
                  3,
                  "change",
                ],
                [3, "value", 4, "ngFor", "ngForOf"],
                [1, "flex", "flex-grow-0", "mx-auto", "space-x-3", "max-w-max"],
                [1, "flex", "flex-row", "space-x-1"],
                [1, "text-gray-50"],
                [
                  "type",
                  "date",
                  1,
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "w-44",
                ],
                [
                  1,
                  "w-full",
                  "p-1",
                  "my-5",
                  "overflow-auto",
                  "md:p-2",
                  "lg:p-5",
                ],
                [1, "text-sm", "italic", "font-semibold", "text-gray-500"],
                [1, "w-full"],
                [1, "bg-black", "bg-opacity-75", "text-gray-50"],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "text-center",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "md:text-sm",
                  "md:p-3",
                ],
                [
                  "class",
                  "transition-all duration-300 hover:bg-gray-200",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [3, "value"],
                [1, "transition-all", "duration-300", "hover:bg-gray-200"],
                [1, "p-3", "border", "border-t-0", "border-gray-400"],
                [1, "w-16", "h-16", "mx-auto", 3, "src"],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  I(1, "app-sidebar", 1),
                  u(2, "div", 2),
                  u(3, "div", 3),
                  u(4, "div", 4),
                  u(5, "div", 5),
                  u(6, "img", 6),
                  D("click", function () {
                    return r.onClickHide();
                  }),
                  c(),
                  u(7, "div", 7),
                  I(8, "app-add-product"),
                  c(),
                  c(),
                  c(),
                  u(9, "div", 8),
                  u(10, "p", 9),
                  g(11, "Home/ Masters/ Products"),
                  c(),
                  u(12, "button", 10),
                  D("click", function () {
                    return r.reloadWithoutRfresh();
                  }),
                  I(13, "img", 11),
                  g(14, " Refresh"),
                  c(),
                  c(),
                  u(15, "div", 12),
                  u(16, "div", 13),
                  u(17, "div", 14),
                  I(18, "img", 15),
                  u(19, "p", 16),
                  g(20, "Products"),
                  c(),
                  u(21, "div", 17),
                  u(22, "button", 18),
                  g(23, "Fetch products from Shopify"),
                  c(),
                  u(24, "button", 19),
                  D("click", function () {
                    return r.onClickDisplay();
                  }),
                  u(25, "span", 20),
                  g(26, "+"),
                  c(),
                  g(27, " Add Product"),
                  c(),
                  c(),
                  c(),
                  u(28, "div", 21),
                  u(29, "button", 22),
                  g(30, "Fetch products from Shopify"),
                  c(),
                  c(),
                  u(31, "div", 23),
                  u(32, "div", 24),
                  u(33, "input", 25),
                  D("input", function (s) {
                    return r.onChange_Prod_SearchInput(s);
                  }),
                  c(),
                  u(34, "select", 26),
                  D("change", function (s) {
                    return r.onSelectProductCategoryDropdown(s);
                  }),
                  u(35, "option"),
                  g(36, "Choose a category"),
                  c(),
                  oe(37, KO, 2, 2, "option", 27),
                  c(),
                  c(),
                  u(38, "div", 28),
                  u(39, "div", 29),
                  u(40, "label", 30),
                  g(41, "From date: "),
                  c(),
                  I(42, "input", 31),
                  c(),
                  u(43, "div", 29),
                  u(44, "label", 30),
                  g(45, "To date: "),
                  c(),
                  I(46, "input", 31),
                  c(),
                  c(),
                  c(),
                  u(47, "div", 32),
                  u(48, "p", 33),
                  g(49),
                  c(),
                  u(50, "table", 34),
                  u(51, "thead", 35),
                  u(52, "th", 36),
                  g(53, "Product ID"),
                  c(),
                  u(54, "th", 36),
                  g(55, "Product Img."),
                  c(),
                  u(56, "th", 36),
                  g(57, "Product Name"),
                  c(),
                  u(58, "th", 36),
                  g(59, "Product Handle"),
                  c(),
                  u(60, "th", 36),
                  g(61, "Product Category"),
                  c(),
                  u(62, "th", 36),
                  g(63, "Created Date"),
                  c(),
                  u(64, "th", 36),
                  g(65, "Updated Date"),
                  c(),
                  c(),
                  u(66, "tbody"),
                  oe(67, YO, 15, 7, "tr", 37),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (y(4),
                    He(
                      "",
                      r.add_prod_display,
                      " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                    ),
                    y(2),
                    B("src", r.cancel_img, U),
                    y(7),
                    B("src", r.refresh_icon, U),
                    y(5),
                    B("src", r.more_option_logo, U),
                    y(19),
                    O("ngForOf", r.category_list),
                    y(12),
                    it("", r.total_products, " products found"),
                    y(18),
                    O("ngForOf", r.productDetails));
              },
              directives: [gt, JO, je],
              styles: [""],
            })),
            (t.ɵprov = F({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ct = (() => {
          class t {
            constructor(n, r) {
              (this.router = n),
                (this.http = r),
                (this._url = Ce_baseURL),
                (this.auth_result = !1),
                (this.authenticated_by_login = !0);
            }
            auth_Token_API() {
              var n = this;
              return Vf(function* () {
                const o = document.cookie.split(";"),
                  s = o[2].split("=");
                return (
                  o[0].split("="),
                  n.http
                    .post(n._url + "auth-token", { cookie: s[1] })
                    .pipe(
                      P((a) => {
                        const l = JSON.stringify(a);
                        return JSON.parse(l).result;
                      })
                    )
                    .subscribe((a) => (n.auth_result = a.token_authorization))
                );
              })();
            }
            canActivate(n, r) {
              return document.cookie
                ? (this.auth_Token_API(),
                  (this.auth_result = !0),
                  console.log("canActivate: ", this.auth_result),
                  !0 === this.auth_result ||
                    this.router.createUrlTree(["/login"]))
                : ((this.auth_result = !1),
                  this.router.createUrlTree(["/login"]));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(S(ce), S(we));
            }),
            (t.ɵprov = F({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function XO(t, e) {
        if ((1 & t && (u(0, "option", 23), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      let eF = (() => {
        class t {
          constructor(n) {
            (this.http = n),
              (this._url = Ce_baseURL),
              (this.msg_popup_display = "hidden"),
              (this.msg_popup_msg = ""),
              (this.msg_popup_color = ""),
              (this.postData = {
                pid: "",
                review: "",
                review_title: "",
                star_count: "",
                cust_name: "",
                cust_email: "",
                cust_location: "",
                shopify_cust_id: null,
                status: 0,
                admin_reply: "",
                created_at: "",
                updated_at: "",
              }),
              (this.selectedProduct_pid = "1");
          }
          reviewOnChange(n) {
            this.postData.review = n.target.value;
          }
          reviewTitleOnChange(n) {
            this.postData.review_title = n.target.value;
          }
          starCountOnChange(n) {
            this.postData.star_count = n.target.value;
          }
          custNameOnChange(n) {
            this.postData.cust_name = n.target.value;
          }
          custEmailOnChange(n) {
            this.postData.cust_email = n.target.value;
          }
          custLocOnChange(n) {
            this.postData.cust_location = n.target.value;
          }
          adminReplyOnChange(n) {
            this.postData.admin_reply = n.target.value;
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.products = n.rows;
              });
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              (this.postData.pid = n.target.value),
              console.log(
                this._url +
                  "postProductReview/" +
                  String(this.selectedProduct_pid)
              );
          }
          sendOnClick() {
            const n = new Date(),
              r_year = n.getFullYear(),
              r_month = n.getMonth(),
              r_date = n.getDate(),
              r_hours = n.getHours(),
              r_min = n.getMinutes(),
              r_sec = n.getSeconds();
            (this.postData.created_at = `${r_date}-${
              r_month + 1
            }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
              (this.postData.updated_at = `${r_date}-${
                r_month + 1
              }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
              console.log(this.postData),
              console.log(this.selectedProduct_pid),
              this.http
                .post(
                  this._url + "postProductReview/" + this.selectedProduct_pid,
                  this.postData
                )
                .subscribe(
                  (o) => {
                    console.log("Response in return: ", o),
                      (this.msg_popup_color = "bg-green-700"),
                      (this.msg_popup_msg = "Uesr added successfully"),
                      (this.msg_popup_display = "block");
                  },
                  (o) => {
                    (this.msg_popup_color = "bg-red-700"),
                      (this.msg_popup_msg = o.error.data),
                      (this.msg_popup_display = "block");
                  }
                );
          }
          ngOnInit() {
            this.fetchProductsDetails();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-add-product-vid"]],
            decls: 49,
            vars: 6,
            consts: [
              ["id", "msg_popup"],
              [1, "text-gray-50"],
              [1, "mx-auto", "overflow-auto", "max-w-max"],
              [1, "relative", "space-y-4", "bg-gray-100", "rounded-md", "p-7"],
              [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
              [1, "space-x-6"],
              [1, "text-sm", "text-gray-900", "w-36"],
              [
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "change",
              ],
              [
                "class",
                "text-lg text-gray-700 ",
                3,
                "value",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "flex", "flex-row", "space-x-6"],
              [1, "mt-3", "text-sm", "text-gray-900", "w-36"],
              [
                "placeholder",
                "Enter review title",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [1, "mt-6", "text-sm", "text-gray-900", "w-36"],
              [
                "placeholder",
                "Give your review here...",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "type",
                "number",
                "max",
                "5",
                "min",
                "1",
                "placeholder",
                "Give the ratings",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Enter customer's name",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Enter customer's email",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Give customer location",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Give your reply to the review here...",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [
                "placeholder",
                "Select a image/videos",
                "type",
                "file",
                1,
                "float-right",
                "p-1",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
              ],
              [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
              [
                "type",
                "button",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-green-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-green-700",
                3,
                "click",
              ],
              [
                "type",
                "",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-gray-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-gray-500",
              ],
              [1, "text-lg", "text-gray-700", 3, "value"],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "p", 1),
                g(2),
                c(),
                c(),
                u(3, "div", 2),
                u(4, "form", 3),
                u(5, "p", 4),
                g(6, "Add Product Review"),
                c(),
                u(7, "div", 5),
                u(8, "label", 6),
                g(9, "Product Name"),
                c(),
                u(10, "select", 7),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                oe(11, XO, 2, 2, "option", 8),
                c(),
                c(),
                u(12, "div", 9),
                u(13, "label", 10),
                g(14, "Review Title"),
                c(),
                u(15, "input", 11),
                D("input", function (s) {
                  return r.reviewTitleOnChange(s);
                }),
                c(),
                c(),
                u(16, "div", 9),
                u(17, "label", 12),
                g(18, "Review"),
                c(),
                u(19, "textarea", 13),
                D("input", function (s) {
                  return r.reviewOnChange(s);
                }),
                c(),
                c(),
                u(20, "div", 5),
                u(21, "label", 12),
                g(22, "Star Ratings"),
                c(),
                u(23, "input", 14),
                D("input", function (s) {
                  return r.starCountOnChange(s);
                }),
                c(),
                c(),
                u(24, "div", 5),
                u(25, "label", 6),
                g(26, "Customer Name"),
                c(),
                u(27, "input", 15),
                D("input", function (s) {
                  return r.custNameOnChange(s);
                }),
                c(),
                c(),
                u(28, "div", 5),
                u(29, "label", 6),
                g(30, "Customer Email"),
                c(),
                u(31, "input", 16),
                D("input", function (s) {
                  return r.custEmailOnChange(s);
                }),
                c(),
                c(),
                u(32, "div", 5),
                u(33, "label", 6),
                g(34, "Customer Location"),
                c(),
                u(35, "input", 17),
                D("input", function (s) {
                  return r.custLocOnChange(s);
                }),
                c(),
                c(),
                u(36, "div", 9),
                u(37, "label", 12),
                g(38, "Admin's Reply"),
                c(),
                u(39, "textarea", 18),
                D("input", function (s) {
                  return r.adminReplyOnChange(s);
                }),
                c(),
                c(),
                u(40, "div", 5),
                u(41, "label", 6),
                g(42, "Select a file: "),
                c(),
                I(43, "input", 19),
                c(),
                u(44, "div", 20),
                u(45, "button", 21),
                D("click", function () {
                  return r.sendOnClick();
                }),
                g(46, "Send"),
                c(),
                u(47, "button", 22),
                g(48, "Cancel"),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (vn(
                    "fixed z-40 p-3 ",
                    r.msg_popup_display,
                    " transition-all ease-linear duration-500 ",
                    r.msg_popup_color,
                    " bottom-0 right-64"
                  ),
                  y(2),
                  x(r.msg_popup_msg),
                  y(9),
                  O("ngForOf", r.products));
            },
            directives: [je],
            styles: [""],
          })),
          t
        );
      })();
      function tF(t, e) {
        if ((1 & t && (u(0, "option", 38), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", e.index), y(1), x(n);
        }
      }
      function nF(t, e) {
        if ((1 & t && (u(0, "option", 38), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function rF(t, e) {
        if (
          (1 & t &&
            (u(0, "tr"),
            u(1, "td", 36),
            g(2),
            c(),
            u(3, "td", 39),
            g(4),
            c(),
            u(5, "td", 40),
            u(6, "a", 41),
            g(7),
            c(),
            c(),
            u(8, "td", 36),
            g(9),
            c(),
            u(10, "td", 36),
            g(11, " TBA"),
            c(),
            u(12, "td", 36),
            g(13),
            c(),
            u(14, "td", 36),
            g(15),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit,
            r = Nt();
          y(2),
            x(n.video_id),
            y(2),
            x(r.selectedProductName || n.pid),
            y(2),
            B("href", n.video_url, U),
            y(1),
            x(n.video_url),
            y(2),
            x(n.video_type),
            y(4),
            x(n.created_at),
            y(2),
            x(n.updated_at);
        }
      }
      let oF = (() => {
          class t {
            constructor(n, r) {
              (this.http = n),
                (this.router = r),
                (this._url = Ce_baseURL),
                (this.more_option_logo =
                  "../../assets/product_review_more.png"),
                (this.add_prod_display = "hidden"),
                (this.cancel_img = "../../assets/cancel.png"),
                (this.refresh_icon = "../../assets/refresh.png"),
                (this.selectedProduct_pid = "1"),
                (this.clicked_review_id = ""),
                (this.selectedProductName = ""),
                (this.total_videos = 0),
                (this.send_img_to_URL = ""),
                (this.selected_video_type = ""),
                (this.selected_p_id = ""),
                (this.selected_video_id = ""),
                (this.video_types = ["Product Testimonials", "How To Use"]),
                (this.req_data = { video_id: "", video_type: "", p_id: "" });
            }
            reloadWithoutRfresh() {
              console.log("Refresh button pressed");
              let n = this.router.url;
              (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
                (this.router.onSameUrlNavigation = "reload"),
                this.router.navigate([n]);
            }
            fetchProductVideos() {
              return this.http
                .post(
                  this._url + "getProductVideos/" + this.selectedProduct_pid,
                  { statuscode: 200, success: !0 }
                )
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.productVideosData = n.rows),
                    (this.total_videos = n.count);
                });
            }
            fetchAllProductVideos_adv(n) {
              return this.http
                .post(this._url + "getProductVideos/all", n)
                .pipe(
                  P((r) => {
                    const o = JSON.stringify(r);
                    return JSON.parse(o).data;
                  })
                )
                .subscribe((r) => {
                  (this.productVideosData = r.rows),
                    (this.total_videos = r.count);
                });
            }
            fetchProductsDetails() {
              return this.http
                .post(this._url + "getProductsMaster/all", {
                  statuscode: 200,
                  success: !0,
                  limit: 1e4,
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  this.productDetails = n.rows;
                });
            }
            ngOnInit() {
              this.fetchProductsDetails(), this.fetchAllProductVideos_adv({});
            }
            onClickDisplay() {
              this.add_prod_display = "block";
            }
            onClickHide() {
              this.add_prod_display = "hidden";
            }
            onSelectProductDropdown(n) {
              (this.selectedProduct_pid = n.target.value),
                console.log(this.selectedProduct_pid),
                "Choose a product" === this.selectedProduct_pid
                  ? this.fetchAllProductVideos_adv({})
                  : (this.fetchProductVideos(),
                    (this.selectedProductName =
                      this.productDetails[
                        Number(this.selectedProduct_pid) - 1
                      ].product_name));
            }
            onSelectVideoTypeDropdown(n) {
              (this.selected_video_type =
                this.video_types[Number(n.target.value)]),
                this.selected_video_type
                  ? ((this.req_data.video_type = this.selected_video_type),
                    this.fetchAllProductVideos_adv(this.req_data))
                  : ((this.req_data.video_type = ""),
                    this.fetchAllProductVideos_adv({}));
            }
            inPidInput(n) {
              (this.selected_p_id = n.target.value),
                (this.req_data.p_id = this.selected_p_id),
                this.fetchAllProductVideos_adv(this.req_data);
            }
            inVideoIdInput(n) {
              (this.selected_video_id = n.target.value),
                (this.req_data.video_id = this.selected_video_id),
                this.fetchAllProductVideos_adv(this.req_data);
            }
            onClickAddFile(n) {
              (this.clicked_review_id = n),
                console.log(n),
                console.log("this.clicked_review_id: ", this.clicked_review_id),
                (this.send_img_to_URL =
                  "/postProductReview_img/" + this.clicked_review_id),
                console.log("this.send_img_to_URL: ", this.send_img_to_URL);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we), T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-product-videos"]],
              decls: 74,
              vars: 10,
              consts: [
                [1, "flex", "mt-0"],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "float-left",
                  "-ml-10",
                  "shadow-lg",
                  "md:ml-0",
                ],
                [
                  1,
                  "flex-shrink",
                  "float-left",
                  "w-full",
                  "ml-2",
                  "overflow-hidden",
                  "md:ml-64",
                ],
                [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
                ["id", "add_product_component"],
                [1, "-ml-64"],
                [
                  1,
                  "absolute",
                  "top-0",
                  "w-5",
                  "h-5",
                  "m-8",
                  "cursor-pointer",
                  "right-64",
                  3,
                  "src",
                  "click",
                ],
                [1, "m-36"],
                [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
                [1, "text-lg", "font-semibold", "text-gray-600"],
                [
                  1,
                  "absolute",
                  "p-1",
                  "px-2",
                  "text-gray-700",
                  "bg-gray-300",
                  "shadow-sm",
                  "top-2.5",
                  "right-5",
                  "flex",
                  "hover:bg-opacity-50",
                  "duration-300",
                  "transition-all",
                  3,
                  "click",
                ],
                [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
                [1, "relative", "xl:p-12"],
                [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
                [
                  1,
                  "relative",
                  "flex",
                  "p-2",
                  "space-x-2",
                  "bg-black",
                  "bg-opacity-75",
                  "md:rounded-t-md",
                ],
                [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
                [
                  1,
                  "mt-.5",
                  "text-lg",
                  "font-extrabold",
                  "text-gray-200",
                  "uppercase",
                  "md:mt-2",
                  "md:text-2xl",
                ],
                [1, "absolute", "flex", "space-x-6", "md:mt-1", "right-3"],
                [
                  1,
                  "hidden",
                  "p-1",
                  "transition-all",
                  "duration-300",
                  "bg-green-400",
                  "rounded-sm",
                  "sm:block",
                  "hover:bg-green-500",
                  "text-md",
                  3,
                  "click",
                ],
                [1, "text-xl", "font-bold"],
                [1, "mx-auto", "my-2", "max-w-max", "sm:hidden"],
                [
                  1,
                  "p-1",
                  "transition-all",
                  "duration-300",
                  "bg-green-400",
                  "rounded-sm",
                  "hover:bg-green-500",
                  "text-md",
                  3,
                  "click",
                ],
                [
                  1,
                  "block",
                  "w-full",
                  "p-3",
                  "space-y-6",
                  "bg-black",
                  "bg-opacity-50",
                  "2xl:space-y-0",
                  "2xl:space-x-4",
                  "2xl:flex",
                ],
                [
                  1,
                  "flex-grow",
                  "space-y-2",
                  "lg:space-x-3",
                  "lg:space-y-0",
                  "lg:flex",
                ],
                [
                  "type",
                  "number",
                  "placeholder",
                  "Search by P_id ",
                  1,
                  "w-full",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "lg:flex-grow",
                  3,
                  "input",
                ],
                [
                  "type",
                  "number",
                  "placeholder",
                  "Search by video_id",
                  1,
                  "w-full",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "lg:flex-grow",
                  "lg:w-auto",
                  3,
                  "input",
                ],
                [
                  1,
                  "w-full",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "lg:w-auto",
                  "lg:max-w-max",
                  3,
                  "change",
                ],
                [3, "value", 4, "ngFor", "ngForOf"],
                [
                  1,
                  "flex-grow-0",
                  "hidden",
                  "mx-auto",
                  "space-x-3",
                  "sm:flex",
                  "max-w-max",
                ],
                [1, "flex", "flex-row", "space-x-1"],
                [1, "text-gray-50"],
                [
                  "type",
                  "date",
                  1,
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "w-44",
                ],
                [
                  1,
                  "w-full",
                  "p-1",
                  "my-5",
                  "overflow-auto",
                  "md:p-2",
                  "lg:p-5",
                ],
                [1, "text-sm", "font-semibold", "text-gray-500"],
                [1, "w-full"],
                [1, "bg-black", "bg-opacity-75", "text-gray-50"],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "text-center",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "md:text-sm",
                  "md:p-3",
                ],
                [4, "ngFor", "ngForOf"],
                [3, "value"],
                [
                  1,
                  "p-1",
                  "text-sm",
                  "text-center",
                  "text-blue-500",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "cursor-pointer",
                  "md:text-sm",
                  "md:p-3",
                  "hover:text-blue-600",
                ],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "text-center",
                  "text-blue-500",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "md:text-sm",
                  "md:p-3",
                  "hover:text-blue-600",
                ],
                ["target", "blank", 3, "href"],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  I(1, "app-sidebar", 1),
                  u(2, "div", 2),
                  u(3, "div", 3),
                  u(4, "div", 4),
                  u(5, "div", 5),
                  u(6, "img", 6),
                  D("click", function () {
                    return r.onClickHide();
                  }),
                  c(),
                  u(7, "div", 7),
                  I(8, "app-add-product-vid"),
                  c(),
                  c(),
                  c(),
                  u(9, "div", 8),
                  u(10, "p", 9),
                  g(11, "Home/ Products Suggestion Masters/ Product Videos"),
                  c(),
                  u(12, "button", 10),
                  D("click", function () {
                    return r.reloadWithoutRfresh();
                  }),
                  I(13, "img", 11),
                  g(14, " Refresh"),
                  c(),
                  c(),
                  u(15, "div", 12),
                  u(16, "div", 13),
                  u(17, "div", 14),
                  I(18, "img", 15),
                  u(19, "p", 16),
                  g(20, "Product Videos"),
                  c(),
                  u(21, "div", 17),
                  u(22, "button", 18),
                  D("click", function () {
                    return r.onClickDisplay();
                  }),
                  u(23, "span", 19),
                  g(24, "+"),
                  c(),
                  g(25, " Add Product's Video"),
                  c(),
                  c(),
                  c(),
                  u(26, "div"),
                  u(27, "div", 20),
                  u(28, "button", 21),
                  D("click", function () {
                    return r.onClickDisplay();
                  }),
                  u(29, "span", 19),
                  g(30, "+"),
                  c(),
                  g(31, " Add Product's Review"),
                  c(),
                  c(),
                  c(),
                  u(32, "div", 22),
                  u(33, "div", 23),
                  u(34, "input", 24),
                  D("input", function (s) {
                    return r.inPidInput(s);
                  }),
                  c(),
                  u(35, "input", 25),
                  D("input", function (s) {
                    return r.inVideoIdInput(s);
                  }),
                  c(),
                  u(36, "select", 26),
                  D("change", function (s) {
                    return r.onSelectVideoTypeDropdown(s);
                  }),
                  u(37, "option"),
                  g(38, "Choose a Video Type"),
                  c(),
                  oe(39, tF, 2, 2, "option", 27),
                  c(),
                  u(40, "select", 26),
                  D("change", function (s) {
                    return r.onSelectProductDropdown(s);
                  }),
                  u(41, "option"),
                  g(42, "Choose a product"),
                  c(),
                  oe(43, nF, 2, 2, "option", 27),
                  c(),
                  c(),
                  u(44, "div", 28),
                  u(45, "div", 29),
                  u(46, "label", 30),
                  g(47, "From date: "),
                  c(),
                  I(48, "input", 31),
                  c(),
                  u(49, "div", 29),
                  u(50, "label", 30),
                  g(51, "To date: "),
                  c(),
                  I(52, "input", 31),
                  c(),
                  c(),
                  c(),
                  u(53, "div", 32),
                  u(54, "p", 33),
                  g(55),
                  c(),
                  u(56, "table", 34),
                  u(57, "thead", 35),
                  u(58, "th", 36),
                  g(59, "Video_ID"),
                  c(),
                  u(60, "th", 36),
                  g(61, "Product Name"),
                  c(),
                  u(62, "th", 36),
                  g(63, "Video URL"),
                  c(),
                  u(64, "th", 36),
                  g(65, "Video Type"),
                  c(),
                  u(66, "th", 36),
                  g(67, "Action"),
                  c(),
                  u(68, "th", 36),
                  g(69, "Created_at"),
                  c(),
                  u(70, "th", 36),
                  g(71, "updated_at"),
                  c(),
                  c(),
                  u(72, "tbody"),
                  oe(73, rF, 16, 7, "tr", 37),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (y(4),
                    He(
                      "",
                      r.add_prod_display,
                      " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                    ),
                    y(2),
                    B("src", r.cancel_img, U),
                    y(7),
                    B("src", r.refresh_icon, U),
                    y(5),
                    B("src", r.more_option_logo, U),
                    y(21),
                    O("ngForOf", r.video_types),
                    y(4),
                    O("ngForOf", r.productDetails),
                    y(12),
                    it("", r.total_videos, " video/s found"),
                    y(18),
                    O("ngForOf", r.productVideosData));
              },
              directives: [gt, eF, je],
              styles: [""],
            })),
            t
          );
        })(),
        sF = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-product-suggestion-master"]],
              decls: 2,
              vars: 0,
              consts: [
                [1, "flex", "mt-0"],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "float-left",
                  "-ml-10",
                  "shadow-lg",
                  "md:ml-0",
                ],
              ],
              template: function (n, r) {
                1 & n && (u(0, "div", 0), I(1, "app-sidebar", 1), c());
              },
              directives: [gt],
              styles: [""],
            })),
            t
          );
        })(),
        iF = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-masters"]],
              decls: 2,
              vars: 0,
              consts: [
                [1, "flex", "mt-0"],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "float-left",
                  "-ml-10",
                  "shadow-lg",
                  "md:ml-0",
                ],
              ],
              template: function (n, r) {
                1 & n && (u(0, "div", 0), I(1, "app-sidebar", 1), c());
              },
              directives: [gt],
              styles: [""],
            })),
            t
          );
        })(),
        Ov = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-screen-loader"]],
              decls: 15,
              vars: 0,
              consts: [
                [1, "space-x-5"],
                [1, "select-none", "let1"],
                [1, "select-none", "let2"],
                [1, "select-none", "let3"],
                [1, "select-none", "let4"],
                [1, "select-none", "let5"],
                [1, "select-none", "let6"],
                [1, "select-none", "let7"],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "h1", 0),
                  u(1, "span", 1),
                  g(2, "l"),
                  c(),
                  u(3, "span", 2),
                  g(4, "o"),
                  c(),
                  u(5, "span", 3),
                  g(6, "a"),
                  c(),
                  u(7, "span", 4),
                  g(8, "d"),
                  c(),
                  u(9, "span", 5),
                  g(10, "i"),
                  c(),
                  u(11, "span", 6),
                  g(12, "n"),
                  c(),
                  u(13, "span", 7),
                  g(14, "g"),
                  c(),
                  c());
              },
              styles: [
                "html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;margin:0;padding:0;font-size:100%;background:#191a1a;text-align:center}h1[_ngcontent-%COMP%]{margin:0;padding:0;font-family:\\2018 Arial Narrow\\2019,sans-serif;font-weight:100;font-size:1.4em;color:#a6a6a6}span[_ngcontent-%COMP%]{position:relative;top:.63em;display:inline-block;text-transform:uppercase;opacity:0;transform:rotateX(-90deg)}.let1[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1s}.let2[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1.2s}.let3[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1.3s}.let4[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1.4s}.let5[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1.5s}.let6[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1.6s}.let7[_ngcontent-%COMP%]{animation:drop 1.2s ease-in-out infinite;animation-delay:1.7s}@keyframes drop{10%{opacity:.5}20%{opacity:1;top:3.78em;transform:rotateX(-360deg)}80%{opacity:1;top:3.78em;transform:rotateX(-360deg)}90%{opacity:.5}to{opacity:0;top:6.94em}}",
              ],
            })),
            t
          );
        })();
      function aF(t, e) {
        if ((1 & t && (u(0, "option", 33), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function lF(t, e) {
        if (1 & t) {
          const n = Rs();
          u(0, "tr", 34),
            u(1, "td", 31),
            g(2),
            c(),
            u(3, "td", 31),
            g(4),
            c(),
            u(5, "td", 31),
            g(6),
            c(),
            u(7, "td", 31),
            g(8),
            c(),
            u(9, "td", 31),
            g(10),
            c(),
            u(11, "td", 35),
            u(12, "img", 36),
            D("click", function () {
              const s = Wr(n).$implicit;
              return Nt().onClick_download_button(s.batch_id, s.batch_name);
            }),
            c(),
            c(),
            u(13, "td", 31),
            g(14),
            c(),
            u(15, "td", 31),
            g(16),
            c(),
            c();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = Nt();
          y(2),
            x(n.batch_id),
            y(2),
            x(n.batch_name),
            y(2),
            x(n.product_master.product_name),
            y(2),
            x(n.product_variant_master.weight),
            y(2),
            x(n.batch_quantity),
            y(2),
            B("src", r.download_img, U),
            y(2),
            x(n.created_by),
            y(2),
            x(n.created_at);
        }
      }
      let uF = (() => {
        class t {
          constructor(n, r) {
            (this.http = n),
              (this.router = r),
              (this._url = Ce_baseURL),
              (this.more_option_logo = "../../assets/product_review_more.png"),
              (this.add_qrBatch_display = "hidden"),
              (this.cancel_img = "../../assets/cancel.png"),
              (this.download_img = "../../assets/download.png"),
              (this.refresh_icon = "../../assets/refresh.png"),
              (this.selectedProduct_pid = "1"),
              (this.selectedProductName = ""),
              (this.total_batches = ""),
              (this.download_api_data = { batchName: "", batchId: "" }),
              (this.pdf_link = ""),
              (this.screen_loader_display = "hidden");
          }
          reloadWithoutRfresh() {
            console.log("Refresh button pressed");
            let n = this.router.url;
            (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
              (this.router.onSameUrlNavigation = "reload"),
              this.router.navigate([n]);
          }
          fetchQrBatchMaster() {
            return this.http
              .post(this._url + "getBatchMaster", {})
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                (this.productQrDetails = n.rows),
                  (this.total_batches = n.count);
              });
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.productDetails = n.rows;
              });
          }
          downloadPDF_API(n) {
            return this.http
              .post(this._url + "downloadPDF", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o);
                })
              )
              .subscribe((r) => {
                (this.screen_loader_display = "hidden"),
                  (this.pdf_link = r.pdf_location),
                  window.open(r.pdf_location, "_blank");
              });
          }
          onClick_download_button(n, r) {
            (this.screen_loader_display = "block"),
              (this.download_api_data.batchId = n),
              (this.download_api_data.batchName = r),
              this.downloadPDF_API(this.download_api_data);
          }
          ngOnInit() {
            this.fetchProductsDetails(), this.fetchQrBatchMaster();
          }
          onClickDisplay() {
            this.add_qrBatch_display = "block";
          }
          onClickHide() {
            this.add_qrBatch_display = "hidden";
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              this.fetchQrBatchMaster(),
              (this.selectedProductName =
                this.productDetails[
                  Number(this.selectedProduct_pid) - 1
                ].product_name);
          }
          onClickAddFile(n) {
            console.log(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we), T(ce));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-qr-batch-master"]],
            decls: 64,
            vars: 8,
            consts: [
              [1, "flex", "mt-0"],
              [
                1,
                "fixed",
                "flex-shrink-0",
                "float-left",
                "-ml-10",
                "shadow-lg",
                "md:ml-0",
              ],
              [
                1,
                "flex-shrink",
                "float-left",
                "w-full",
                "ml-2",
                "overflow-hidden",
                "md:ml-64",
              ],
              [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
              ["id", "screen_loader"],
              [1, "-mt-40", "-ml-64"],
              [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
              [1, "text-lg", "font-semibold", "text-gray-600"],
              [
                1,
                "absolute",
                "p-1",
                "px-2",
                "text-gray-700",
                "bg-gray-300",
                "shadow-sm",
                "top-2.5",
                "right-5",
                "flex",
                "hover:bg-opacity-50",
                "duration-300",
                "transition-all",
                3,
                "click",
              ],
              [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
              [1, "relative", "xl:p-12"],
              [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
              [
                1,
                "relative",
                "flex",
                "p-2",
                "space-x-2",
                "bg-black",
                "bg-opacity-75",
                "md:rounded-t-md",
              ],
              [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
              [
                1,
                "mt-.5",
                "text-lg",
                "font-extrabold",
                "text-gray-200",
                "uppercase",
                "md:mt-2",
                "md:text-2xl",
              ],
              [1, "mx-auto", "my-2", "max-w-max", "sm:hidden"],
              [
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [1, "text-xl", "font-bold"],
              [
                1,
                "block",
                "w-full",
                "p-3",
                "space-y-6",
                "bg-black",
                "bg-opacity-50",
                "2xl:space-y-0",
                "2xl:space-x-4",
                "2xl:flex",
              ],
              [
                1,
                "flex-grow",
                "space-y-2",
                "lg:space-x-3",
                "lg:space-y-0",
                "lg:flex",
              ],
              [
                "placeholder",
                "Search by Batch Name",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
              ],
              [
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:w-auto",
                "lg:max-w-max",
                3,
                "change",
              ],
              [3, "value", 4, "ngFor", "ngForOf"],
              [
                1,
                "flex-grow-0",
                "hidden",
                "mx-auto",
                "space-x-3",
                "sm:flex",
                "max-w-max",
              ],
              [1, "flex", "flex-row", "space-x-1"],
              [1, "text-gray-50"],
              [
                "type",
                "date",
                1,
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "w-44",
              ],
              [1, "w-full", "p-1", "my-5", "overflow-auto", "md:p-2", "lg:p-5"],
              [1, "text-sm", "italic", "font-semibold", "text-gray-500"],
              [1, "w-full"],
              [1, "bg-black", "bg-opacity-75", "text-gray-50"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
              ],
              [
                "class",
                "transition-all duration-300 hover:bg-gray-200",
                4,
                "ngFor",
                "ngForOf",
              ],
              [3, "value"],
              [1, "transition-all", "duration-300", "hover:bg-gray-200"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
                "max-w-max",
              ],
              [
                1,
                "w-10",
                "h-10",
                "mx-auto",
                "cursor-pointer",
                3,
                "src",
                "click",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                I(1, "app-sidebar", 1),
                u(2, "div", 2),
                u(3, "div", 3),
                u(4, "div", 4),
                u(5, "div", 5),
                I(6, "app-screen-loader"),
                c(),
                c(),
                u(7, "div", 6),
                u(8, "p", 7),
                g(9, "QR Manager/ Batch Master"),
                c(),
                u(10, "button", 8),
                D("click", function () {
                  return r.reloadWithoutRfresh();
                }),
                I(11, "img", 9),
                g(12, " Refresh"),
                c(),
                c(),
                u(13, "div", 10),
                u(14, "div", 11),
                u(15, "div", 12),
                I(16, "img", 13),
                u(17, "p", 14),
                g(18, "Batch Master"),
                c(),
                c(),
                u(19, "div"),
                u(20, "div", 15),
                u(21, "button", 16),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(22, "span", 17),
                g(23, "+"),
                c(),
                g(24, " Add Batch Master's Review"),
                c(),
                c(),
                c(),
                u(25, "div", 18),
                u(26, "div", 19),
                I(27, "input", 20),
                u(28, "select", 21),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                u(29, "option"),
                g(30, "Choose a Product"),
                c(),
                oe(31, aF, 2, 2, "option", 22),
                c(),
                c(),
                u(32, "div", 23),
                u(33, "div", 24),
                u(34, "label", 25),
                g(35, "From date: "),
                c(),
                I(36, "input", 26),
                c(),
                u(37, "div", 24),
                u(38, "label", 25),
                g(39, "To date: "),
                c(),
                I(40, "input", 26),
                c(),
                c(),
                c(),
                u(41, "div", 27),
                u(42, "p", 28),
                g(43),
                c(),
                u(44, "table", 29),
                u(45, "thead", 30),
                u(46, "th", 31),
                g(47, "Sr No."),
                c(),
                u(48, "th", 31),
                g(49, "Batch Name"),
                c(),
                u(50, "th", 31),
                g(51, "Product Name"),
                c(),
                u(52, "th", 31),
                g(53, "Varient Size"),
                c(),
                u(54, "th", 31),
                g(55, "Quantity"),
                c(),
                u(56, "th", 31),
                g(57, "Actions"),
                c(),
                u(58, "th", 31),
                g(59, "Created By"),
                c(),
                u(60, "th", 31),
                g(61, "Created_at"),
                c(),
                c(),
                u(62, "tbody"),
                oe(63, lF, 17, 8, "tr", 32),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (y(4),
                  He(
                    "fixed top-0 ",
                    r.screen_loader_display,
                    " z-50 flex items-center justify-center w-full h-screen overflow-hidden bg-black bg-opacity-90"
                  ),
                  y(7),
                  B("src", r.refresh_icon, U),
                  y(5),
                  B("src", r.more_option_logo, U),
                  y(15),
                  O("ngForOf", r.productDetails),
                  y(12),
                  it("", r.total_batches, " batches found"),
                  y(20),
                  O("ngForOf", r.productQrDetails));
            },
            directives: [gt, Ov, je],
            styles: [""],
          })),
          t
        );
      })();
      function cF(t, e) {
        if ((1 & t && (u(0, "option", 37), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function dF(t, e) {
        if (
          (1 & t &&
            (u(0, "tr"),
            u(1, "td", 35),
            g(2),
            c(),
            u(3, "td", 38),
            g(4),
            c(),
            u(5, "td", 35),
            g(6),
            c(),
            u(7, "td", 35),
            g(8, "TBA"),
            c(),
            u(9, "td", 35),
            g(10),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2),
            x(n.sugst_id),
            y(2),
            x(n.product_master.product_name),
            y(2),
            x(n.suggst_pid),
            y(4),
            x(n.created_at);
        }
      }
      let fF = (() => {
        class t {
          constructor(n, r) {
            (this.http = n),
              (this.router = r),
              (this._url = Ce_baseURL),
              (this.more_option_logo = "../../assets/product_review_more.png"),
              (this.add_prod_display = "hidden"),
              (this.cancel_img = "../../assets/cancel.png"),
              (this.selectedProduct_pid = "1"),
              (this.clicked_review_id = ""),
              (this.selectedProductName = ""),
              (this.total_suggested_prod = 0),
              (this.refresh_icon = "../../assets/refresh.png"),
              (this.sugestion_data = {});
          }
          reloadWithoutRfresh() {
            console.log("Refresh button pressed");
            let n = this.router.url;
            (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
              (this.router.onSameUrlNavigation = "reload"),
              this.router.navigate([n]);
          }
          fetchSuggestedProduct(n) {
            return this.http
              .post(
                this._url + "getProductSuggestion/" + this.selectedProduct_pid,
                n
              )
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                (this.suggested_productData = r.rows),
                  (this.total_suggested_prod = r.count);
              });
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.productDetails = n.rows;
              });
          }
          fetchProductsDetailsByPid(n, r, o) {
            return this.http
              .post(this._url + "getProductsMaster/" + n.target.value, {
                statuscode: 200,
                success: !0,
              })
              .pipe(
                P((i) => {
                  const a = JSON.stringify(i);
                  return JSON.parse(a).data;
                })
              )
              .subscribe((i) => {
                (this.productDataByID = i.rows), console.log(r), console.log(o);
              });
          }
          ngOnInit() {
            this.fetchProductsDetails(), this.fetchSuggestedProduct({});
          }
          onClickDisplay() {
            this.add_prod_display = "block";
          }
          onClickHide() {
            this.add_prod_display = "hidden";
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              this.fetchSuggestedProduct({ pId: this.selectedProduct_pid });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we), T(ce));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-product-suggestion"]],
            decls: 65,
            vars: 9,
            consts: [
              [1, "flex", "mt-0"],
              [
                1,
                "fixed",
                "flex-shrink-0",
                "float-left",
                "-ml-10",
                "shadow-lg",
                "md:ml-0",
              ],
              [
                1,
                "flex-shrink",
                "float-left",
                "w-full",
                "ml-2",
                "overflow-hidden",
                "md:ml-64",
              ],
              [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
              ["id", "add_product_component"],
              [1, "-ml-64"],
              [
                1,
                "absolute",
                "top-0",
                "w-5",
                "h-5",
                "m-8",
                "cursor-pointer",
                "right-64",
                3,
                "src",
                "click",
              ],
              [1, "m-36"],
              [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
              [1, "text-lg", "font-semibold", "text-gray-600"],
              [
                1,
                "absolute",
                "p-1",
                "px-2",
                "text-gray-700",
                "bg-gray-300",
                "shadow-sm",
                "top-2.5",
                "right-5",
                "flex",
                "hover:bg-opacity-50",
                "duration-300",
                "transition-all",
                3,
                "click",
              ],
              [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
              [1, "relative", "xl:p-12"],
              [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
              [
                1,
                "relative",
                "flex",
                "p-2",
                "space-x-2",
                "bg-black",
                "bg-opacity-75",
                "md:rounded-t-md",
              ],
              [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
              [
                1,
                "mt-.5",
                "text-lg",
                "font-extrabold",
                "text-gray-200",
                "uppercase",
                "md:mt-2",
                "md:text-2xl",
              ],
              [1, "absolute", "flex", "space-x-6", "md:mt-1", "right-3"],
              [
                1,
                "hidden",
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "sm:block",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [1, "text-xl", "font-bold"],
              [1, "mx-auto", "my-2", "max-w-max", "sm:hidden"],
              [
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [
                1,
                "block",
                "w-full",
                "p-3",
                "space-y-6",
                "bg-black",
                "bg-opacity-50",
                "2xl:space-y-0",
                "2xl:space-x-4",
                "2xl:flex",
              ],
              [
                1,
                "flex-grow",
                "space-y-2",
                "lg:space-x-3",
                "lg:space-y-0",
                "lg:flex",
              ],
              [
                "placeholder",
                "Search for product",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
              ],
              [
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:w-auto",
                "lg:max-w-max",
                3,
                "change",
              ],
              [3, "value", 4, "ngFor", "ngForOf"],
              [
                1,
                "flex-grow-0",
                "hidden",
                "mx-auto",
                "space-x-3",
                "sm:flex",
                "max-w-max",
              ],
              [1, "flex", "flex-row", "space-x-1"],
              [1, "text-gray-50"],
              [
                "type",
                "date",
                1,
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "w-44",
              ],
              [1, "w-full", "p-1", "my-5", "overflow-auto", "md:p-2", "lg:p-5"],
              [1, "text-sm", "font-semibold", "text-gray-500"],
              [1, "w-full"],
              [1, "bg-black", "bg-opacity-75", "text-gray-50"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
              ],
              [4, "ngFor", "ngForOf"],
              [3, "value"],
              [
                1,
                "p-1",
                "text-sm",
                "text-center",
                "text-blue-500",
                "border",
                "border-t-0",
                "border-gray-400",
                "cursor-pointer",
                "md:text-sm",
                "md:p-3",
                "hover:text-blue-600",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                I(1, "app-sidebar", 1),
                u(2, "div", 2),
                u(3, "div", 3),
                u(4, "div", 4),
                u(5, "div", 5),
                u(6, "img", 6),
                D("click", function () {
                  return r.onClickHide();
                }),
                c(),
                u(7, "div", 7),
                I(8, "app-add-product-rev"),
                c(),
                c(),
                c(),
                u(9, "div", 8),
                u(10, "p", 9),
                g(11, "Home/ Products Suggestion Masters/ Product Suggestion"),
                c(),
                u(12, "button", 10),
                D("click", function () {
                  return r.reloadWithoutRfresh();
                }),
                I(13, "img", 11),
                g(14, " Refresh"),
                c(),
                c(),
                u(15, "div", 12),
                u(16, "div", 13),
                u(17, "div", 14),
                I(18, "img", 15),
                u(19, "p", 16),
                g(20, "Product Suggestion"),
                c(),
                u(21, "div", 17),
                u(22, "button", 18),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(23, "span", 19),
                g(24, "+"),
                c(),
                g(25, " Add Product Suggestion"),
                c(),
                c(),
                c(),
                u(26, "div"),
                u(27, "div", 20),
                u(28, "button", 21),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(29, "span", 19),
                g(30, "+"),
                c(),
                g(31, " Add Product Suggestion"),
                c(),
                c(),
                c(),
                u(32, "div", 22),
                u(33, "div", 23),
                I(34, "input", 24),
                u(35, "select", 25),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                u(36, "option"),
                g(37, "Choose a product"),
                c(),
                oe(38, cF, 2, 2, "option", 26),
                c(),
                c(),
                u(39, "div", 27),
                u(40, "div", 28),
                u(41, "label", 29),
                g(42, "From date: "),
                c(),
                I(43, "input", 30),
                c(),
                u(44, "div", 28),
                u(45, "label", 29),
                g(46, "To date: "),
                c(),
                I(47, "input", 30),
                c(),
                c(),
                c(),
                u(48, "div", 31),
                u(49, "p", 32),
                g(50),
                c(),
                u(51, "table", 33),
                u(52, "thead", 34),
                u(53, "th", 35),
                g(54, "Suggst_ID"),
                c(),
                u(55, "th", 35),
                g(56, "Product Name"),
                c(),
                u(57, "th", 35),
                g(58, "Suggested Product Name"),
                c(),
                u(59, "th", 35),
                g(60, "Action"),
                c(),
                u(61, "th", 35),
                g(62, "Created_at"),
                c(),
                c(),
                u(63, "tbody"),
                oe(64, dF, 11, 4, "tr", 36),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (y(4),
                  He(
                    "",
                    r.add_prod_display,
                    " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                  ),
                  y(2),
                  B("src", r.cancel_img, U),
                  y(7),
                  B("src", r.refresh_icon, U),
                  y(5),
                  B("src", r.more_option_logo, U),
                  y(20),
                  O("ngForOf", r.productDetails),
                  y(12),
                  it("", r.total_suggested_prod, " suggested product/s found"),
                  y(14),
                  O("ngForOf", r.suggested_productData));
            },
            directives: [gt, Lf, je],
            styles: [""],
          })),
          t
        );
      })();
      function pF(t, e) {
        if ((1 & t && (u(0, "option", 39), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function hF(t, e) {
        if (
          (1 & t &&
            (u(0, "tr"),
            u(1, "td", 36),
            g(2),
            c(),
            u(3, "td", 36),
            g(4),
            c(),
            u(5, "td", 36),
            g(6),
            c(),
            u(7, "td", 37),
            I(8, "img", 40),
            c(),
            u(9, "td", 36),
            g(10, "TBA"),
            c(),
            u(11, "td", 36),
            g(12),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2),
            x(n.review_id),
            y(2),
            x(n.file_id),
            y(2),
            x(n.file_type),
            y(2),
            B("src", n.file_path, U),
            y(4),
            x(n.created_at);
        }
      }
      let gF = (() => {
        class t {
          constructor(n, r) {
            (this.http = n),
              (this.router = r),
              (this._url = Ce_baseURL),
              (this.more_option_logo = "../../assets/product_review_more.png"),
              (this.add_prod_display = "hidden"),
              (this.cancel_img = "../../assets/cancel.png"),
              (this.refresh_icon = "../../assets/refresh.png"),
              (this.selectedProduct_pid = "1"),
              (this.clicked_review_id = ""),
              (this.selectedProductName = ""),
              (this.total_product_rev_img = 0),
              (this.req_data = { p_id: "", review_id: "", file_id: "" });
          }
          reloadWithoutRfresh() {
            console.log("Refresh button pressed");
            let n = this.router.url;
            (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
              (this.router.onSameUrlNavigation = "reload"),
              this.router.navigate([n]);
          }
          fetchProductRevImg(n) {
            return this.http
              .post(this._url + "getProductReviewImg/all", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                console.log("result:", r),
                  (this.product_rev_img_data = r.rows),
                  console.log(this.product_rev_img_data),
                  (this.total_product_rev_img = r.count);
              });
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.productDetails = n.rows;
              });
          }
          ngOnInit() {
            this.fetchProductsDetails(), this.fetchProductRevImg({});
          }
          onClickDisplay() {
            this.add_prod_display = "block";
          }
          onClickHide() {
            this.add_prod_display = "hidden";
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              (this.selectedProductName =
                this.productDetails[
                  Number(this.selectedProduct_pid) - 1
                ].product_name),
              console.log(this.selectedProduct_pid);
          }
          onChangeReviewId(n) {
            (this.review_id_val = n.target.value),
              (this.req_data.review_id = this.review_id_val),
              this.fetchProductRevImg(this.req_data);
          }
          onChangeFileId(n) {
            (this.file_id_val = n.target.value),
              (this.req_data.file_id = this.file_id_val),
              this.fetchProductRevImg(this.req_data);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we), T(ce));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-product-review-images"]],
            decls: 68,
            vars: 9,
            consts: [
              [1, "flex", "mt-0"],
              [
                1,
                "fixed",
                "flex-shrink-0",
                "float-left",
                "-ml-10",
                "shadow-lg",
                "md:ml-0",
              ],
              [
                1,
                "flex-shrink",
                "float-left",
                "w-full",
                "ml-2",
                "overflow-hidden",
                "md:ml-64",
              ],
              [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
              ["id", "add_product_component"],
              [1, "-ml-64"],
              [
                1,
                "absolute",
                "top-0",
                "w-5",
                "h-5",
                "m-8",
                "cursor-pointer",
                "right-64",
                3,
                "src",
                "click",
              ],
              [1, "m-36"],
              [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
              [1, "text-lg", "font-semibold", "text-gray-600"],
              [
                1,
                "absolute",
                "p-1",
                "px-2",
                "text-gray-700",
                "bg-gray-300",
                "shadow-sm",
                "top-2.5",
                "right-5",
                "flex",
                "hover:bg-opacity-50",
                "duration-300",
                "transition-all",
                3,
                "click",
              ],
              [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
              [1, "relative", "xl:p-12"],
              [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
              [
                1,
                "relative",
                "flex",
                "p-2",
                "space-x-2",
                "bg-black",
                "bg-opacity-75",
                "md:rounded-t-md",
              ],
              [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
              [
                1,
                "mt-.5",
                "text-lg",
                "font-extrabold",
                "text-gray-200",
                "uppercase",
                "md:mt-2",
                "md:text-2xl",
              ],
              [1, "absolute", "flex", "space-x-6", "md:mt-1", "right-3"],
              [
                1,
                "hidden",
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "sm:block",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [1, "text-xl", "font-bold"],
              [1, "mx-auto", "my-2", "max-w-max", "sm:hidden"],
              [
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [
                1,
                "block",
                "w-full",
                "p-3",
                "space-y-6",
                "bg-black",
                "bg-opacity-50",
                "2xl:space-y-0",
                "2xl:space-x-4",
                "2xl:flex",
              ],
              [
                1,
                "flex-grow",
                "space-y-2",
                "lg:space-x-3",
                "lg:space-y-0",
                "lg:flex",
              ],
              [
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:w-auto",
                "lg:max-w-max",
                3,
                "change",
              ],
              [3, "value", 4, "ngFor", "ngForOf"],
              [
                "type",
                "number",
                "placeholder",
                "Type Review ID here",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
                3,
                "input",
              ],
              [
                "type",
                "number",
                "placeholder",
                "Type File ID here",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
                3,
                "input",
              ],
              [
                1,
                "flex-grow-0",
                "hidden",
                "mx-auto",
                "space-x-3",
                "sm:flex",
                "max-w-max",
              ],
              [1, "flex", "flex-row", "space-x-1"],
              [1, "text-gray-50"],
              [
                "type",
                "date",
                1,
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "w-44",
              ],
              [1, "w-full", "p-1", "my-5", "overflow-auto", "md:p-2", "lg:p-5"],
              [1, "text-sm", "font-semibold", "text-gray-500"],
              [1, "w-full"],
              [1, "bg-black", "bg-opacity-75", "text-gray-50"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
              ],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-1",
              ],
              [4, "ngFor", "ngForOf"],
              [3, "value"],
              [
                1,
                "object-cover",
                "w-24",
                "h-24",
                "mx-auto",
                "md:h-64",
                "md:w-64",
                "2xl:h-96",
                "2xl:w-96",
                3,
                "src",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                I(1, "app-sidebar", 1),
                u(2, "div", 2),
                u(3, "div", 3),
                u(4, "div", 4),
                u(5, "div", 5),
                u(6, "img", 6),
                D("click", function () {
                  return r.onClickHide();
                }),
                c(),
                u(7, "div", 7),
                I(8, "app-add-product-rev"),
                c(),
                c(),
                c(),
                u(9, "div", 8),
                u(10, "p", 9),
                g(
                  11,
                  "Home/ Products Suggestion Masters/ Product Review Images"
                ),
                c(),
                u(12, "button", 10),
                D("click", function () {
                  return r.reloadWithoutRfresh();
                }),
                I(13, "img", 11),
                g(14, " Refresh"),
                c(),
                c(),
                u(15, "div", 12),
                u(16, "div", 13),
                u(17, "div", 14),
                I(18, "img", 15),
                u(19, "p", 16),
                g(20, "Product Review Images"),
                c(),
                u(21, "div", 17),
                u(22, "button", 18),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(23, "span", 19),
                g(24, "+"),
                c(),
                g(25, " Add Product Review Image"),
                c(),
                c(),
                c(),
                u(26, "div"),
                u(27, "div", 20),
                u(28, "button", 21),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(29, "span", 19),
                g(30, "+"),
                c(),
                g(31, " Add Product Review Image"),
                c(),
                c(),
                c(),
                u(32, "div", 22),
                u(33, "div", 23),
                u(34, "select", 24),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                u(35, "option"),
                g(36, "Choose a product"),
                c(),
                oe(37, pF, 2, 2, "option", 25),
                c(),
                u(38, "input", 26),
                D("input", function (s) {
                  return r.onChangeReviewId(s);
                }),
                c(),
                u(39, "input", 27),
                D("input", function (s) {
                  return r.onChangeFileId(s);
                }),
                c(),
                c(),
                u(40, "div", 28),
                u(41, "div", 29),
                u(42, "label", 30),
                g(43, "From date: "),
                c(),
                I(44, "input", 31),
                c(),
                u(45, "div", 29),
                u(46, "label", 30),
                g(47, "To date: "),
                c(),
                I(48, "input", 31),
                c(),
                c(),
                c(),
                u(49, "div", 32),
                u(50, "p", 33),
                g(51),
                c(),
                u(52, "table", 34),
                u(53, "thead", 35),
                u(54, "th", 36),
                g(55, "Review ID"),
                c(),
                u(56, "th", 36),
                g(57, "File ID"),
                c(),
                u(58, "th", 36),
                g(59, "File Type"),
                c(),
                u(60, "th", 37),
                g(61, "Image"),
                c(),
                u(62, "th", 36),
                g(63, "Actions"),
                c(),
                u(64, "th", 36),
                g(65, "Created_at"),
                c(),
                c(),
                u(66, "tbody"),
                oe(67, hF, 13, 5, "tr", 38),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (y(4),
                  He(
                    "",
                    r.add_prod_display,
                    " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                  ),
                  y(2),
                  B("src", r.cancel_img, U),
                  y(7),
                  B("src", r.refresh_icon, U),
                  y(5),
                  B("src", r.more_option_logo, U),
                  y(19),
                  O("ngForOf", r.productDetails),
                  y(14),
                  it(
                    "",
                    r.total_product_rev_img,
                    " suggested product-review-image found"
                  ),
                  y(16),
                  O("ngForOf", r.product_rev_img_data));
            },
            directives: [gt, Lf, je],
            styles: [""],
          })),
          t
        );
      })();
      function mF(t, e) {
        if ((1 & t && (u(0, "option", 14), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      let _F = (() => {
        class t {
          constructor(n) {
            (this.http = n),
              (this._url = Ce_baseURL),
              (this.usp_data = {
                pid: 0,
                usp_title: "",
                product_id: "",
                created_at: "",
                updated_at: "",
              }),
              (this.msg_popup_display = "hidden"),
              (this.msg_popup_msg = ""),
              (this.msg_popup_color = "");
          }
          selectedProduct(n) {
            (this.usp_data.pid = Number(n.target.value)),
              this.fetchProductMasterByPid({ p_id: this.usp_data.pid });
          }
          enteredUsp(n) {
            this.usp_data.usp_title = n.target.value;
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.products = n.rows;
              });
          }
          fetchProductMasterByPid(n) {
            return this.http
              .post(this._url + "getProductsMaster/all", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                this.usp_data.product_id = r.rows[0].product_id;
              });
          }
          sendUSPDetails() {
            return this.http
              .post(this._url + "postProductUSP", this.usp_data)
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).result;
                })
              )
              .subscribe(
                (n) => {
                  (this.API_result = n),
                    (this.msg_popup_color = "bg-green-700"),
                    (this.msg_popup_msg = "USP added successfully"),
                    (this.msg_popup_display = "block");
                },
                (n) => {
                  (this.msg_popup_color = "bg-red-700"),
                    (this.msg_popup_msg = n.error.data),
                    (this.msg_popup_display = "block");
                }
              );
          }
          sendOnClick() {
            var n = this;
            return Vf(function* () {
              const r = new Date(),
                o_year = r.getFullYear(),
                o_month = r.getMonth(),
                o_date = r.getDate(),
                o_hours = r.getHours(),
                o_min = r.getMinutes(),
                o_sec = r.getSeconds();
              (n.usp_data.created_at = `${o_date}-${
                o_month + 1
              }-${o_year} ${o_hours}:${o_min}:${o_sec}`),
                (n.usp_data.updated_at = `${o_date}-${
                  o_month + 1
                }-${o_year} ${o_hours}:${o_min}:${o_sec}`),
                n.sendUSPDetails();
            })();
          }
          ngOnInit() {
            this.fetchProductsDetails();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-add-product-usp"]],
            decls: 21,
            vars: 6,
            consts: [
              ["id", "msg_popup"],
              [1, "text-gray-50"],
              [1, "mx-auto", "bg-white", "max-w-max"],
              [1, "relative", "p-10", "space-y-8", "bg-gray-100", "rounded-md"],
              [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
              [1, "flex", "space-x-6"],
              [1, "mt-2", "text-sm", "text-gray-900", "w-36"],
              [
                1,
                "float-right",
                "p-2",
                "text-sm",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "change",
              ],
              [
                "class",
                "text-lg text-gray-700 ",
                3,
                "value",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "mt-8", "text-sm", "text-gray-900", "w-36"],
              [
                "name",
                "",
                "id",
                "",
                "cols",
                "47",
                "rows",
                "4",
                1,
                "text-sm",
                "outline-none",
                3,
                "input",
              ],
              [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
              [
                "type",
                "button",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-green-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-green-700",
                3,
                "click",
              ],
              [
                "type",
                "",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-gray-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-gray-500",
              ],
              [1, "text-lg", "text-gray-700", 3, "value"],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "p", 1),
                g(2),
                c(),
                c(),
                u(3, "div", 2),
                u(4, "form", 3),
                u(5, "p", 4),
                g(6, "Add Product USP"),
                c(),
                u(7, "div", 5),
                u(8, "p", 6),
                g(9, "Select Product"),
                c(),
                u(10, "select", 7),
                D("change", function (s) {
                  return r.selectedProduct(s);
                }),
                oe(11, mF, 2, 2, "option", 8),
                c(),
                c(),
                u(12, "div", 5),
                u(13, "p", 9),
                g(14, "USP"),
                c(),
                u(15, "textarea", 10),
                D("input", function (s) {
                  return r.enteredUsp(s);
                }),
                c(),
                c(),
                u(16, "div", 11),
                u(17, "button", 12),
                D("click", function () {
                  return r.sendOnClick();
                }),
                g(18, "Send"),
                c(),
                u(19, "button", 13),
                g(20, "Cancel"),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (vn(
                    "fixed z-40 p-3 ",
                    r.msg_popup_display,
                    " transition-all ease-linear duration-500 ",
                    r.msg_popup_color,
                    " bottom-0 right-64"
                  ),
                  y(2),
                  x(r.msg_popup_msg),
                  y(9),
                  O("ngForOf", r.products));
            },
            directives: [je],
            styles: [""],
          })),
          t
        );
      })();
      function yF(t, e) {
        if ((1 & t && (u(0, "option", 37), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function bF(t, e) {
        if (
          (1 & t &&
            (u(0, "tr"),
            u(1, "td", 35),
            g(2),
            c(),
            u(3, "td", 38),
            g(4),
            c(),
            u(5, "td", 35),
            g(6),
            c(),
            u(7, "td", 35),
            g(8),
            c(),
            u(9, "td", 35),
            g(10, "TBA"),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2),
            x(n.prod_usp_id),
            y(2),
            x(n.product_master.product_name),
            y(2),
            x(n.usp_title),
            y(2),
            x(n.created_at);
        }
      }
      let vF = (() => {
        class t {
          constructor(n, r) {
            (this.http = n),
              (this.router = r),
              (this._url = Ce_baseURL),
              (this.more_option_logo = "../../assets/product_review_more.png"),
              (this.add_prod_display = "hidden"),
              (this.cancel_img = "../../assets/cancel.png"),
              (this.selectedProduct_pid = "1"),
              (this.total_usp = 0),
              (this.refresh_icon = "../../assets/refresh.png"),
              (this.usp_req_data = { pid: "", uspTitle: "" });
          }
          reloadWithoutRfresh() {
            console.log("Refresh button pressed");
            let n = this.router.url;
            (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
              (this.router.onSameUrlNavigation = "reload"),
              this.router.navigate([n]);
          }
          fetchProductUSP(n) {
            return this.http
              .post(this._url + "getProductUSP/all", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                (this.product_usp_data = r.rows), (this.total_usp = r.count);
              });
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.productDetails = n.rows;
              });
          }
          ngOnInit() {
            this.fetchProductsDetails(), this.fetchProductUSP({});
          }
          onClickDisplay() {
            this.add_prod_display = "block";
          }
          onClickHide() {
            this.add_prod_display = "hidden";
          }
          onInputUSP(n) {
            (this.usp_req_data.uspTitle = n.target.value),
              "" === this.usp_req_data.uspTitle ||
                this.fetchProductUSP({ uspTitle: this.usp_req_data.uspTitle });
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              (this.usp_req_data.pid = this.selectedProduct_pid),
              "Choose a product" === this.selectedProduct_pid ||
                this.fetchProductUSP({ pid: this.usp_req_data.pid });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we), T(ce));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-product-usp"]],
            decls: 65,
            vars: 9,
            consts: [
              [1, "flex", "mt-0"],
              [
                1,
                "fixed",
                "flex-shrink-0",
                "float-left",
                "-ml-10",
                "shadow-lg",
                "md:ml-0",
              ],
              [
                1,
                "flex-shrink",
                "float-left",
                "w-full",
                "ml-2",
                "overflow-hidden",
                "md:ml-64",
              ],
              [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
              ["id", "add_product_component"],
              [1, "-ml-64"],
              [
                1,
                "absolute",
                "top-0",
                "w-5",
                "h-5",
                "m-8",
                "cursor-pointer",
                "right-64",
                3,
                "src",
                "click",
              ],
              [1, "m-36"],
              [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
              [1, "text-lg", "font-semibold", "text-gray-600"],
              [
                1,
                "absolute",
                "p-1",
                "px-2",
                "text-gray-700",
                "bg-gray-300",
                "shadow-sm",
                "top-2.5",
                "right-5",
                "flex",
                "hover:bg-opacity-50",
                "duration-300",
                "transition-all",
                3,
                "click",
              ],
              [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
              [1, "relative", "xl:p-12"],
              [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
              [
                1,
                "relative",
                "flex",
                "p-2",
                "space-x-2",
                "bg-black",
                "bg-opacity-75",
                "md:rounded-t-md",
              ],
              [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
              [
                1,
                "mt-.5",
                "text-lg",
                "font-extrabold",
                "text-gray-200",
                "uppercase",
                "md:mt-2",
                "md:text-2xl",
              ],
              [1, "absolute", "flex", "space-x-6", "md:mt-1", "right-3"],
              [
                1,
                "hidden",
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "sm:block",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [1, "text-xl", "font-bold"],
              [1, "mx-auto", "my-2", "max-w-max", "sm:hidden"],
              [
                1,
                "p-1",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "hover:bg-green-500",
                "text-md",
                3,
                "click",
              ],
              [
                1,
                "block",
                "w-full",
                "p-3",
                "space-y-6",
                "bg-black",
                "bg-opacity-50",
                "2xl:space-y-0",
                "2xl:space-x-4",
                "2xl:flex",
              ],
              [
                1,
                "flex-grow",
                "space-y-2",
                "lg:space-x-3",
                "lg:space-y-0",
                "lg:flex",
              ],
              [
                "placeholder",
                "Search by USP",
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:flex-grow",
                "lg:w-auto",
                3,
                "input",
              ],
              [
                1,
                "w-full",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "lg:w-auto",
                "lg:max-w-max",
                3,
                "change",
              ],
              [3, "value", 4, "ngFor", "ngForOf"],
              [
                1,
                "flex-grow-0",
                "hidden",
                "mx-auto",
                "space-x-3",
                "sm:flex",
                "max-w-max",
              ],
              [1, "flex", "flex-row", "space-x-1"],
              [1, "text-gray-50"],
              [
                "type",
                "date",
                1,
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                "w-44",
              ],
              [1, "w-full", "p-1", "my-5", "overflow-auto", "md:p-2", "lg:p-5"],
              [1, "text-sm", "font-semibold", "text-gray-500"],
              [1, "w-full"],
              [1, "bg-black", "bg-opacity-75", "text-gray-50"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
              ],
              [4, "ngFor", "ngForOf"],
              [3, "value"],
              [
                1,
                "p-1",
                "text-sm",
                "text-center",
                "text-blue-500",
                "border",
                "border-t-0",
                "border-gray-400",
                "cursor-pointer",
                "md:text-sm",
                "md:p-3",
                "hover:text-blue-600",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                I(1, "app-sidebar", 1),
                u(2, "div", 2),
                u(3, "div", 3),
                u(4, "div", 4),
                u(5, "div", 5),
                u(6, "img", 6),
                D("click", function () {
                  return r.onClickHide();
                }),
                c(),
                u(7, "div", 7),
                I(8, "app-add-product-usp"),
                c(),
                c(),
                c(),
                u(9, "div", 8),
                u(10, "p", 9),
                g(11, "Home/ Masters/ Product USP"),
                c(),
                u(12, "button", 10),
                D("click", function () {
                  return r.reloadWithoutRfresh();
                }),
                I(13, "img", 11),
                g(14, " Refresh"),
                c(),
                c(),
                u(15, "div", 12),
                u(16, "div", 13),
                u(17, "div", 14),
                I(18, "img", 15),
                u(19, "p", 16),
                g(20, "Product USP"),
                c(),
                u(21, "div", 17),
                u(22, "button", 18),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(23, "span", 19),
                g(24, "+"),
                c(),
                g(25, " Add Product USP"),
                c(),
                c(),
                c(),
                u(26, "div"),
                u(27, "div", 20),
                u(28, "button", 21),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(29, "span", 19),
                g(30, "+"),
                c(),
                g(31, " Add Product USP"),
                c(),
                c(),
                c(),
                u(32, "div", 22),
                u(33, "div", 23),
                u(34, "input", 24),
                D("input", function (s) {
                  return r.onInputUSP(s);
                }),
                c(),
                u(35, "select", 25),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                u(36, "option"),
                g(37, "Choose a product"),
                c(),
                oe(38, yF, 2, 2, "option", 26),
                c(),
                c(),
                u(39, "div", 27),
                u(40, "div", 28),
                u(41, "label", 29),
                g(42, "From date: "),
                c(),
                I(43, "input", 30),
                c(),
                u(44, "div", 28),
                u(45, "label", 29),
                g(46, "To date: "),
                c(),
                I(47, "input", 30),
                c(),
                c(),
                c(),
                u(48, "div", 31),
                u(49, "p", 32),
                g(50),
                c(),
                u(51, "table", 33),
                u(52, "thead", 34),
                u(53, "th", 35),
                g(54, "Product Usp ID"),
                c(),
                u(55, "th", 35),
                g(56, "Product Name"),
                c(),
                u(57, "th", 35),
                g(58, "Product USP Title"),
                c(),
                u(59, "th", 35),
                g(60, "Created On"),
                c(),
                u(61, "th", 35),
                g(62, "Action"),
                c(),
                c(),
                u(63, "tbody"),
                oe(64, bF, 11, 4, "tr", 36),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (y(4),
                  He(
                    "",
                    r.add_prod_display,
                    " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                  ),
                  y(2),
                  B("src", r.cancel_img, U),
                  y(7),
                  B("src", r.refresh_icon, U),
                  y(5),
                  B("src", r.more_option_logo, U),
                  y(20),
                  O("ngForOf", r.productDetails),
                  y(12),
                  it("", r.total_usp, " product usp found"),
                  y(14),
                  O("ngForOf", r.product_usp_data));
            },
            directives: [gt, _F, je],
            styles: [""],
          })),
          t
        );
      })();
      function CF(t, e) {
        if ((1 & t && (u(0, "option", 17), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      let wF = (() => {
        class t {
          constructor(n) {
            (this.http = n),
              (this._url = Ce_baseURL),
              (this.selectedProduct_pid = "1"),
              (this.selected_varient_Id = Number),
              (this.msg_popup_display = "hidden"),
              (this.msg_popup_msg = ""),
              (this.msg_popup_color = ""),
              (this.screen_loader_display = "hidden"),
              (this.add_qrBatch_data = {
                pId: "",
                variantId: Number,
                batchName: "",
                qrPosition: "",
                createdBy: "",
                quantity: "",
              });
          }
          input_batchName(n) {
            this.add_qrBatch_data.batchName = n.target.value;
          }
          fetchProductsDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", {
                statuscode: 200,
                success: !0,
                limit: 1e4,
              })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.products = n.rows;
              });
          }
          createBatchAPI(n) {
            return this.http
              .post(this._url + "generateQRText", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o);
                })
              )
              .subscribe(
                (r) => {
                  (this.screen_loader_display = "hidden"),
                    (this.msg_popup_color = "bg-green-700"),
                    (this.msg_popup_msg = "Batch Created successfully"),
                    (this.msg_popup_display = "block");
                },
                (r) => {
                  (this.screen_loader_display = "hidden"),
                    (this.msg_popup_color = "bg-red-700"),
                    (this.msg_popup_msg = r.error.data),
                    (this.msg_popup_display = "block");
                }
              );
          }
          getProduct_varient(n) {
            return this.http
              .post(this._url + "getProductVarientMaster/all", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                (this.selected_varient_Id = r.rows[0].variant_id),
                  (this.add_qrBatch_data.variantId = r.rows[0].variant_id);
              });
          }
          onSelectProductDropdown(n) {
            (this.selectedProduct_pid = n.target.value),
              (this.add_qrBatch_data.pId = n.target.value),
              this.getProduct_varient({ pId: this.selectedProduct_pid });
          }
          onSelectQRPosition(n) {
            this.add_qrBatch_data.qrPosition = n.target.value;
          }
          input_quantity(n) {
            this.add_qrBatch_data.quantity = n.target.value;
          }
          get_created_by() {
            const r = document.cookie.split(";"),
              s = (r[2].split("="), r[1].split("="));
            r[0].split("="), (this.add_qrBatch_data.createdBy = s[1]);
          }
          onSendButtornClick() {
            this.get_created_by(),
              console.log(this.add_qrBatch_data),
              this.createBatchAPI(this.add_qrBatch_data),
              (this.screen_loader_display = "block");
          }
          ngOnInit() {
            this.fetchProductsDetails();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-add-qr-batch"]],
            decls: 36,
            vars: 9,
            consts: [
              ["id", "msg_popup"],
              [1, "text-gray-50"],
              ["id", "screen_loader"],
              [1, "-mt-40", "-ml-64"],
              [1, "mx-auto", "bg-white", "max-w-max"],
              [1, "relative", "p-10", "space-y-8", "bg-gray-100", "rounded-md"],
              [1, "flex", "space-x-4"],
              [1, "mt-3", "text-gray-900", "text-md", "w-36"],
              [
                "placeholder",
                "Enter Batch Name",
                1,
                "float-right",
                "p-2",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "text-md",
                "w-80",
                3,
                "input",
              ],
              [
                1,
                "float-right",
                "p-2",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "text-md",
                "w-80",
                3,
                "change",
              ],
              [1, "text-gray-700", "text-md"],
              [
                "class",
                "text-gray-700 text-md ",
                3,
                "value",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "text-gray-700", "uppercase", "text-md"],
              [
                "type",
                "number",
                "min",
                "1",
                "placeholder",
                "Enter user first_name",
                1,
                "float-right",
                "p-2",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "text-md",
                "w-80",
                3,
                "input",
              ],
              [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
              [
                "type",
                "button",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-green-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-green-700",
                3,
                "click",
              ],
              [
                "type",
                "",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-gray-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-gray-500",
              ],
              [1, "text-gray-700", "text-md", 3, "value"],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "p", 1),
                g(2),
                c(),
                c(),
                u(3, "div", 2),
                u(4, "div", 3),
                I(5, "app-screen-loader"),
                c(),
                c(),
                u(6, "div", 4),
                u(7, "form", 5),
                u(8, "div", 6),
                u(9, "p", 7),
                g(10, "Batch Name"),
                c(),
                u(11, "input", 8),
                D("input", function (s) {
                  return r.input_batchName(s);
                }),
                c(),
                c(),
                u(12, "div", 6),
                u(13, "p", 7),
                g(14, "Select Product"),
                c(),
                u(15, "select", 9),
                D("change", function (s) {
                  return r.onSelectProductDropdown(s);
                }),
                u(16, "option", 10),
                g(17, "Select a Product"),
                c(),
                oe(18, CF, 2, 2, "option", 11),
                c(),
                c(),
                u(19, "div", 6),
                u(20, "p", 7),
                g(21, "Select QR Position"),
                c(),
                u(22, "select", 9),
                D("change", function (s) {
                  return r.onSelectQRPosition(s);
                }),
                u(23, "option", 10),
                g(24, "Select QR Position"),
                c(),
                u(25, "option", 12),
                g(26, "right"),
                c(),
                c(),
                c(),
                u(27, "div", 6),
                u(28, "p", 7),
                g(29, "Quantity"),
                c(),
                u(30, "input", 13),
                D("input", function (s) {
                  return r.input_quantity(s);
                }),
                c(),
                c(),
                u(31, "div", 14),
                u(32, "button", 15),
                D("click", function () {
                  return r.onSendButtornClick();
                }),
                g(33, "Send"),
                c(),
                u(34, "button", 16),
                g(35, "Cancel"),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (vn(
                    "fixed z-40 p-3 ",
                    r.msg_popup_display,
                    " transition-all ease-linear duration-500 ",
                    r.msg_popup_color,
                    " bottom-0 right-64"
                  ),
                  y(2),
                  x(r.msg_popup_msg),
                  y(1),
                  He(
                    "top-0 ",
                    r.screen_loader_display,
                    " z-50 w-screen h-screen fixed left-0 flex items-center justify-center  overflow-hidden bg-black bg-opacity-90"
                  ),
                  y(15),
                  O("ngForOf", r.products));
            },
            directives: [Ov, je],
            styles: [""],
          })),
          t
        );
      })();
      function DF(t, e) {
        if ((1 & t && (u(0, "option", 29), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function EF(t, e) {
        if (1 & t) {
          const n = Rs();
          u(0, "tr", 30),
            u(1, "td", 24),
            g(2),
            c(),
            u(3, "td", 24),
            g(4),
            c(),
            u(5, "td", 24),
            g(6),
            c(),
            u(7, "td", 24),
            g(8),
            c(),
            u(9, "td", 24),
            g(10),
            c(),
            u(11, "td", 31),
            u(12, "img", 32),
            D("click", function () {
              const s = Wr(n).$implicit;
              return Nt().onClick_download_button(s.batch_id, s.batch_name);
            }),
            c(),
            c(),
            u(13, "td", 24),
            g(14),
            c(),
            u(15, "td", 24),
            g(16),
            c(),
            c();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = Nt();
          y(2),
            x(n.batch_id),
            y(2),
            x(n.batch_name),
            y(2),
            x(n.product_master.product_name),
            y(2),
            x(n.product_variant_master.weight),
            y(2),
            x(n.batch_quantity),
            y(2),
            B("src", r.download_img, U),
            y(2),
            x(n.created_by),
            y(2),
            x(n.created_at);
        }
      }
      let xF = (() => {
          class t {
            constructor(n, r) {
              (this.http = n),
                (this.router = r),
                (this._url = Ce_baseURL),
                (this.more_option_logo =
                  "../../assets/product_review_more.png"),
                (this.add_qrBatch_display = "hidden"),
                (this.cancel_img = "../../assets/cancel.png"),
                (this.download_img = "../../assets/download.png"),
                (this.selectedProduct_pid = "1"),
                (this.selectedProductName = ""),
                (this.total_qr_batch = "0"),
                (this.download_api_data = { batchName: "", batchId: "" }),
                (this.pdf_link = "");
            }
            fetchQrBatchMaster() {
              return this.http
                .post(this._url + "getBatchMaster", {})
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  (this.productQrDetails = n.rows),
                    (this.total_qr_batch = n.count);
                });
            }
            fetchProductsDetails() {
              return this.http
                .post(this._url + "getProductsMaster/all", {
                  statuscode: 200,
                  success: !0,
                })
                .pipe(
                  P((n) => {
                    const r = JSON.stringify(n);
                    return JSON.parse(r).data;
                  })
                )
                .subscribe((n) => {
                  this.productDetails = n.rows;
                });
            }
            downloadPDF_API(n) {
              return this.http
                .post(this._url + "downloadPDF", n)
                .pipe(
                  P((r) => {
                    const o = JSON.stringify(r);
                    return JSON.parse(o);
                  })
                )
                .subscribe((r) => {
                  (this.pdf_link = r.pdf_location),
                    window.open(r.pdf_location, "_blank");
                });
            }
            onClick_download_button(n, r) {
              (this.download_api_data.batchId = n),
                (this.download_api_data.batchName = r),
                this.downloadPDF_API(this.download_api_data);
            }
            ngOnInit() {
              this.fetchProductsDetails(), this.fetchQrBatchMaster();
            }
            onClickDisplay() {
              this.add_qrBatch_display = "block";
            }
            onClickHide() {
              this.add_qrBatch_display = "hidden";
            }
            onSelectProductDropdown(n) {
              (this.selectedProduct_pid = n.target.value),
                this.fetchQrBatchMaster(),
                (this.selectedProductName =
                  this.productDetails[
                    Number(this.selectedProduct_pid) - 1
                  ].product_name);
            }
            onClickAddFile(n) {
              console.log(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we), T(ce));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-qr-master"]],
              decls: 57,
              vars: 8,
              consts: [
                [1, "flex", "mt-0"],
                [
                  1,
                  "fixed",
                  "flex-shrink-0",
                  "float-left",
                  "-ml-10",
                  "shadow-lg",
                  "md:ml-0",
                ],
                [
                  1,
                  "flex-shrink",
                  "float-left",
                  "w-full",
                  "ml-2",
                  "overflow-hidden",
                  "md:ml-64",
                ],
                [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
                [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
                [1, "text-lg", "font-semibold", "text-gray-600"],
                [1, "relative", "xl:p-12"],
                [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
                [
                  1,
                  "relative",
                  "flex",
                  "p-2",
                  "space-x-2",
                  "bg-black",
                  "bg-opacity-75",
                  "md:rounded-t-md",
                ],
                [1, "w-8", "h-8", "md:w-12", "md:h-12", 3, "src"],
                [
                  1,
                  "mt-.5",
                  "text-lg",
                  "font-extrabold",
                  "text-gray-200",
                  "uppercase",
                  "md:mt-2",
                  "md:text-2xl",
                ],
                [
                  1,
                  "block",
                  "w-full",
                  "p-3",
                  "space-y-6",
                  "bg-black",
                  "bg-opacity-50",
                  "2xl:space-y-0",
                  "2xl:space-x-4",
                  "2xl:flex",
                ],
                [
                  1,
                  "flex-grow",
                  "space-y-2",
                  "lg:space-x-3",
                  "lg:space-y-0",
                  "lg:flex",
                ],
                [
                  "placeholder",
                  "Search by Batch Name",
                  1,
                  "w-full",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "lg:flex-grow",
                  "lg:w-auto",
                ],
                [
                  1,
                  "w-full",
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "lg:w-auto",
                  "lg:max-w-max",
                  3,
                  "change",
                ],
                [3, "value", 4, "ngFor", "ngForOf"],
                [
                  1,
                  "flex-grow-0",
                  "hidden",
                  "mx-auto",
                  "space-x-3",
                  "sm:flex",
                  "max-w-max",
                ],
                [1, "flex", "flex-row", "space-x-1"],
                [1, "text-gray-50"],
                [
                  "type",
                  "date",
                  1,
                  "h-10",
                  "p-1",
                  "text-gray-900",
                  "bg-gray-100",
                  "outline-none",
                  "w-44",
                ],
                [
                  1,
                  "w-full",
                  "p-1",
                  "my-5",
                  "overflow-auto",
                  "md:p-2",
                  "lg:p-5",
                ],
                [1, "text-sm", "italic", "font-semibold", "text-gray-500"],
                [1, "w-full"],
                [1, "bg-black", "bg-opacity-75", "text-gray-50"],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "text-center",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "md:text-sm",
                  "md:p-3",
                ],
                [
                  "class",
                  "transition-all duration-300 hover:bg-gray-200",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                ["id", "add_user_component"],
                [
                  1,
                  "absolute",
                  "right-0",
                  "w-8",
                  "h-8",
                  "m-8",
                  "cursor-pointer",
                  "top-16",
                  3,
                  "src",
                  "click",
                ],
                [1, "m-36"],
                [3, "value"],
                [1, "transition-all", "duration-300", "hover:bg-gray-200"],
                [
                  1,
                  "p-1",
                  "text-xs",
                  "text-center",
                  "border",
                  "border-t-0",
                  "border-gray-400",
                  "md:text-sm",
                  "md:p-3",
                  "max-w-max",
                ],
                [
                  1,
                  "w-10",
                  "h-10",
                  "mx-auto",
                  "cursor-pointer",
                  3,
                  "src",
                  "click",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  I(1, "app-sidebar", 1),
                  u(2, "div", 2),
                  u(3, "div", 3),
                  u(4, "div", 4),
                  u(5, "p", 5),
                  g(6, "QR Manager/ QR Master"),
                  c(),
                  c(),
                  u(7, "div", 6),
                  u(8, "div", 7),
                  u(9, "div", 8),
                  I(10, "img", 9),
                  u(11, "p", 10),
                  g(12, "QR Master"),
                  c(),
                  c(),
                  u(13, "div"),
                  u(14, "div", 11),
                  u(15, "div", 12),
                  I(16, "input", 13),
                  u(17, "select", 14),
                  D("change", function (s) {
                    return r.onSelectProductDropdown(s);
                  }),
                  u(18, "option"),
                  g(19, "Choose a Product"),
                  c(),
                  oe(20, DF, 2, 2, "option", 15),
                  c(),
                  c(),
                  u(21, "div", 16),
                  u(22, "div", 17),
                  u(23, "label", 18),
                  g(24, "From date: "),
                  c(),
                  I(25, "input", 19),
                  c(),
                  u(26, "div", 17),
                  u(27, "label", 18),
                  g(28, "To date: "),
                  c(),
                  I(29, "input", 19),
                  c(),
                  c(),
                  c(),
                  u(30, "div", 20),
                  u(31, "p", 21),
                  g(32),
                  c(),
                  u(33, "table", 22),
                  u(34, "thead", 23),
                  u(35, "th", 24),
                  g(36, "Sr No."),
                  c(),
                  u(37, "th", 24),
                  g(38, "Batch Name"),
                  c(),
                  u(39, "th", 24),
                  g(40, "Product Name"),
                  c(),
                  u(41, "th", 24),
                  g(42, "Varient Size"),
                  c(),
                  u(43, "th", 24),
                  g(44, "Quantity"),
                  c(),
                  u(45, "th", 24),
                  g(46, "Actions"),
                  c(),
                  u(47, "th", 24),
                  g(48, "Created By"),
                  c(),
                  u(49, "th", 24),
                  g(50, "Created_at"),
                  c(),
                  c(),
                  u(51, "tbody"),
                  oe(52, EF, 17, 8, "tr", 25),
                  c(),
                  c(),
                  c(),
                  c(),
                  u(53, "div", 26),
                  u(54, "img", 27),
                  D("click", function () {
                    return r.onClickHide();
                  }),
                  c(),
                  u(55, "div", 28),
                  I(56, "app-add-qr-batch"),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (y(10),
                    B("src", r.more_option_logo, U),
                    y(10),
                    O("ngForOf", r.productDetails),
                    y(12),
                    it("", r.total_qr_batch, " products found"),
                    y(20),
                    O("ngForOf", r.productQrDetails),
                    y(1),
                    He(
                      "fixed h-screen overflow-auto top-0 ",
                      r.add_qrBatch_display,
                      " left-0 w-full bg-black bg-opacity-80 backdrop-filter backdrop-blur-sm"
                    ),
                    y(1),
                    B("src", r.cancel_img, U));
              },
              directives: [gt, je, wF],
              styles: [""],
            })),
            t
          );
        })(),
        TF = (() => {
          class t {
            constructor(n) {
              (this.http = n),
                (this._url = Ce_baseURL),
                (this.postData = { tpmName: "" }),
                (this.msg_popup_display = "hidden"),
                (this.msg_popup_msg = ""),
                (this.msg_popup_color = "");
            }
            TpmNameInput(n) {
              this.postData.tpmName = n.target.value;
            }
            sendTPMDetails(n) {
              return this.http
                .post(this._url + "createTPM", n)
                .pipe(
                  P((r) => {
                    const o = JSON.stringify(r);
                    return JSON.parse(o).result;
                  })
                )
                .subscribe(
                  (r) => {
                    (this.API_result = r),
                      (this.msg_popup_color = "bg-green-700"),
                      (this.msg_popup_msg = "TPM added successfully"),
                      (this.msg_popup_display = "block");
                  },
                  (r) => {
                    (this.msg_popup_color = "bg-red-700"),
                      (this.msg_popup_msg = r.error.data),
                      (this.msg_popup_display = "block");
                  }
                );
            }
            sendOnClick() {
              const n = new Date();
              n.getFullYear(),
                n.getMonth(),
                n.getDate(),
                n.getHours(),
                n.getMinutes(),
                n.getSeconds(),
                this.sendTPMDetails(this.postData);
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(we));
            }),
            (t.ɵcmp = ie({
              type: t,
              selectors: [["app-add-tpm-app"]],
              decls: 16,
              vars: 5,
              consts: [
                ["id", "msg_popup"],
                [1, "text-gray-50"],
                [1, "mx-auto", "bg-white", "max-w-max"],
                [
                  1,
                  "relative",
                  "p-10",
                  "space-y-8",
                  "bg-gray-100",
                  "rounded-md",
                ],
                [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
                [1, "flex", "flex-row", "space-x-6"],
                [1, "mt-1", "text-sm", "text-gray-900"],
                [
                  "placeholder",
                  "Give TPM Name",
                  1,
                  "float-right",
                  "p-1",
                  "text-sm",
                  "font-normal",
                  "text-gray-800",
                  "outline-none",
                  "w-80",
                  3,
                  "input",
                ],
                [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
                [
                  "type",
                  "button",
                  1,
                  "p-1",
                  "px-3",
                  "text-lg",
                  "text-white",
                  "transition-all",
                  "duration-300",
                  "bg-green-800",
                  "rounded-sm",
                  "outline-none",
                  "cursor-pointer",
                  "hover:bg-green-700",
                  3,
                  "click",
                ],
                [
                  "type",
                  "",
                  1,
                  "p-1",
                  "px-3",
                  "text-lg",
                  "text-white",
                  "transition-all",
                  "duration-300",
                  "bg-gray-800",
                  "rounded-sm",
                  "outline-none",
                  "cursor-pointer",
                  "hover:bg-gray-500",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (u(0, "div", 0),
                  u(1, "p", 1),
                  g(2),
                  c(),
                  c(),
                  u(3, "div", 2),
                  u(4, "form", 3),
                  u(5, "p", 4),
                  g(6, "Add TPM"),
                  c(),
                  u(7, "div", 5),
                  u(8, "p", 6),
                  g(9, "TPM Name"),
                  c(),
                  u(10, "input", 7),
                  D("input", function (s) {
                    return r.TpmNameInput(s);
                  }),
                  c(),
                  c(),
                  u(11, "div", 8),
                  u(12, "button", 9),
                  D("click", function () {
                    return r.sendOnClick();
                  }),
                  g(13, "Send"),
                  c(),
                  u(14, "button", 10),
                  g(15, "Cancel"),
                  c(),
                  c(),
                  c(),
                  c()),
                  2 & n &&
                    (vn(
                      "fixed z-40 p-3 ",
                      r.msg_popup_display,
                      " transition-all ease-linear duration-500 ",
                      r.msg_popup_color,
                      " bottom-0 right-64"
                    ),
                    y(2),
                    x(r.msg_popup_msg));
              },
              styles: [""],
            })),
            t
          );
        })();
      function IF(t, e) {
        if (
          (1 & t &&
            (u(0, "tr", 27),
            u(1, "td", 25),
            g(2),
            c(),
            u(3, "td", 25),
            g(4),
            c(),
            u(5, "td", 25),
            g(6, "TBA"),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2), x(n.tp_id), y(2), x(n.tp_name);
        }
      }
      let SF = (() => {
        class t {
          constructor(n, r) {
            (this.http = n),
              (this.router = r),
              (this._url = Ce_baseURL),
              (this.more_option_logo = "../../assets/product_review_more.png"),
              (this.add_TPM_display = "hidden"),
              (this.cancel_img = "../../assets/cancel.png"),
              (this.refresh_icon = "../../assets/refresh.png"),
              (this.total_TPM = "0"),
              (this.input_TPM_name = ""),
              (this.req_body = { tpmName: "" });
          }
          reloadWithoutRfresh() {
            console.log("Refresh button pressed");
            let n = this.router.url;
            (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
              (this.router.onSameUrlNavigation = "reload"),
              this.router.navigate([n]);
          }
          fetchTPMDetails() {
            return this.http
              .post(this._url + "getTPMDetails", {})
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                (this.tpmData = n.rows), (this.total_TPM = n.count);
              });
          }
          fetchTPMDetails_adv(n) {
            return this.http
              .post(this._url + "getTPMDetails", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).data;
                })
              )
              .subscribe((r) => {
                (this.tpmData = r.rows), (this.total_TPM = r.count);
              });
          }
          onChange_TPM_SearchInput(n) {
            (this.input_TPM_name = n.target.value),
              (this.req_body.tpmName = this.input_TPM_name),
              console.log(this.req_body),
              this.req_body.tpmName
                ? this.fetchTPMDetails_adv(this.req_body)
                : this.fetchTPMDetails();
          }
          ngOnInit() {
            this.fetchTPMDetails();
          }
          onClickDisplay() {
            this.add_TPM_display = "block";
          }
          onClickHide() {
            this.add_TPM_display = "hidden";
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we), T(ce));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-tpm-apps"]],
            decls: 40,
            vars: 8,
            consts: [
              [1, "flex", "mt-0"],
              [
                1,
                "fixed",
                "flex-shrink-0",
                "float-left",
                "-ml-10",
                "shadow-lg",
                "md:ml-0",
              ],
              [
                1,
                "flex-shrink",
                "float-left",
                "w-full",
                "ml-2",
                "overflow-hidden",
                "md:ml-64",
              ],
              [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
              ["id", "add_TPM_component"],
              [1, "-ml-64"],
              [
                1,
                "absolute",
                "top-0",
                "w-5",
                "h-5",
                "m-8",
                "cursor-pointer",
                "right-64",
                3,
                "src",
                "click",
              ],
              [1, "m-36"],
              [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
              [1, "text-lg", "font-semibold", "text-gray-600"],
              [
                1,
                "absolute",
                "p-1",
                "px-2",
                "text-gray-700",
                "bg-gray-300",
                "shadow-sm",
                "top-2.5",
                "right-5",
                "flex",
                "hover:bg-opacity-50",
                "duration-300",
                "transition-all",
                3,
                "click",
              ],
              [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
              [1, "relative", "xl:p-12"],
              [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
              [
                1,
                "relative",
                "flex",
                "p-2",
                "space-x-2",
                "bg-black",
                "bg-opacity-75",
                "md:rounded-t-md",
              ],
              [1, "w-12", "h-12", 3, "src"],
              [
                1,
                "mt-2",
                "text-2xl",
                "font-extrabold",
                "text-gray-200",
                "uppercase",
              ],
              [
                1,
                "absolute",
                "flex",
                "mt-1",
                "space-x-2",
                "md:space-x-6",
                "right-3",
              ],
              [
                "placeholder",
                "Search by TPM Name",
                1,
                "flex-grow",
                "h-10",
                "p-1",
                "text-gray-900",
                "bg-gray-100",
                "outline-none",
                3,
                "input",
              ],
              [
                1,
                "p-1",
                "text-sm",
                "transition-all",
                "duration-300",
                "bg-green-400",
                "rounded-sm",
                "hover:bg-green-500",
                "md:text-md",
                3,
                "click",
              ],
              [1, "text-base", "font-bold", "md:text-xl"],
              [1, "w-full", "p-1", "my-5", "overflow-auto", "md:p-2", "lg:p-5"],
              [1, "text-sm", "italic", "font-semibold", "text-gray-500"],
              [1, "w-full"],
              [1, "bg-black", "bg-opacity-75", "text-gray-50"],
              [
                1,
                "p-1",
                "text-xs",
                "text-center",
                "border",
                "border-t-0",
                "border-gray-400",
                "md:text-sm",
                "md:p-3",
              ],
              [
                "class",
                "transition-all duration-300 hover:bg-gray-200",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "transition-all", "duration-300", "hover:bg-gray-200"],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                I(1, "app-sidebar", 1),
                u(2, "div", 2),
                u(3, "div", 3),
                u(4, "div", 4),
                u(5, "div", 5),
                u(6, "img", 6),
                D("click", function () {
                  return r.onClickHide();
                }),
                c(),
                u(7, "div", 7),
                I(8, "app-add-tpm-app"),
                c(),
                c(),
                c(),
                u(9, "div", 8),
                u(10, "p", 9),
                g(11, "Home/ Third Party/ TPM Apps"),
                c(),
                u(12, "button", 10),
                D("click", function () {
                  return r.reloadWithoutRfresh();
                }),
                I(13, "img", 11),
                g(14, " Refresh"),
                c(),
                c(),
                u(15, "div", 12),
                u(16, "div", 13),
                u(17, "div", 14),
                I(18, "img", 15),
                u(19, "p", 16),
                g(20, "TPM"),
                c(),
                u(21, "div", 17),
                u(22, "input", 18),
                D("input", function (s) {
                  return r.onChange_TPM_SearchInput(s);
                }),
                c(),
                u(23, "button", 19),
                D("click", function () {
                  return r.onClickDisplay();
                }),
                u(24, "span", 20),
                g(25, "+"),
                c(),
                g(26, " Add TPM"),
                c(),
                c(),
                c(),
                u(27, "div", 21),
                u(28, "p", 22),
                g(29),
                c(),
                u(30, "table", 23),
                u(31, "thead", 24),
                u(32, "th", 25),
                g(33, "TPM ID"),
                c(),
                u(34, "th", 25),
                g(35, "TPM Name"),
                c(),
                u(36, "th", 25),
                g(37, "Actions"),
                c(),
                c(),
                u(38, "tbody"),
                oe(39, IF, 7, 2, "tr", 26),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (y(4),
                  He(
                    "",
                    r.add_TPM_display,
                    " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                  ),
                  y(2),
                  B("src", r.cancel_img, U),
                  y(7),
                  B("src", r.refresh_icon, U),
                  y(5),
                  B("src", r.more_option_logo, U),
                  y(11),
                  it("", r.total_TPM, " TPM found"),
                  y(10),
                  O("ngForOf", r.tpmData));
            },
            directives: [gt, TF, je],
            styles: [""],
          })),
          t
        );
      })();
      function PF(t, e) {
        if ((1 & t && (u(0, "option", 13), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.tp_id), y(1), x(n.tp_name);
        }
      }
      function RF(t, e) {
        if ((1 & t && (u(0, "option", 13), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      let MF = (() => {
        class t {
          constructor(n) {
            (this.http = n),
              (this._url = Ce_baseURL),
              (this.postData = {
                tpId: 0,
                pId: 0,
                tpmProductUrl: "",
                created_at: "",
                updated_at: "",
              }),
              (this.msg_popup_display = "hidden"),
              (this.msg_popup_msg = ""),
              (this.msg_popup_color = "");
          }
          TpmLinkInput(n) {
            this.postData.tpId = Number(n.target.value);
          }
          ProductSelectInput(n) {
            this.postData.pId = Number(n.target.value);
          }
          TPMLink(n) {
            this.postData.tpmProductUrl = n.target.value;
          }
          sendTPMDetails(n) {
            return this.http
              .post(this._url + "createTPMReview", n)
              .pipe(
                P((r) => {
                  const o = JSON.stringify(r);
                  return JSON.parse(o).result;
                })
              )
              .subscribe(
                (r) => {
                  (this.API_result = r),
                    (this.msg_popup_color = "bg-green-700"),
                    (this.msg_popup_msg = "TPM Review added successfully"),
                    (this.msg_popup_display = "block");
                },
                (r) => {
                  (this.msg_popup_color = "bg-red-700"),
                    (this.msg_popup_msg = r.error.data),
                    (this.msg_popup_display = "block");
                }
              );
          }
          fetchTPMDetails() {
            return this.http
              .post(this._url + "getTPMDetails", {})
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.tpm_details = n.rows;
              });
          }
          fetchProductDetails() {
            return this.http
              .post(this._url + "getProductsMaster/all", { limit: 1e4 })
              .pipe(
                P((n) => {
                  const r = JSON.stringify(n);
                  return JSON.parse(r).data;
                })
              )
              .subscribe((n) => {
                this.productDetails = n.rows;
              });
          }
          sendOnClick() {
            const n = new Date(),
              r_year = n.getFullYear(),
              r_month = n.getMonth(),
              r_date = n.getDate(),
              r_hours = n.getHours(),
              r_min = n.getMinutes(),
              r_sec = n.getSeconds();
            (this.postData.created_at = `${r_date}-${
              r_month + 1
            }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
              (this.postData.updated_at = `${r_date}-${
                r_month + 1
              }-${r_year} ${r_hours}:${r_min}:${r_sec}`),
              this.sendTPMDetails(this.postData);
          }
          ngOnInit() {
            this.fetchTPMDetails(), this.fetchProductDetails();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(we));
          }),
          (t.ɵcmp = ie({
            type: t,
            selectors: [["app-add-tpm-product-reviewlink"]],
            decls: 30,
            vars: 7,
            consts: [
              ["id", "msg_popup"],
              [1, "text-gray-50"],
              [1, "mx-auto", "bg-white", "max-w-max"],
              [1, "relative", "p-10", "space-y-8", "bg-gray-100", "rounded-md"],
              [1, "text-xl", "font-medium", "text-center", "text-gray-700"],
              [1, "flex", "flex-row", "space-x-6"],
              [1, "mt-6", "text-lg", "text-gray-900", "w-36"],
              [
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "change",
              ],
              [
                "class",
                "mt-6 text-lg text-gray-900 w-36",
                3,
                "value",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                "placeholder",
                "Provide link here",
                1,
                "float-right",
                "p-2",
                "text-lg",
                "font-normal",
                "text-gray-800",
                "outline-none",
                "w-80",
                3,
                "input",
              ],
              [1, "flex", "pt-5", "mx-auto", "space-x-3", "max-w-max"],
              [
                "type",
                "button",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-green-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-green-700",
                3,
                "click",
              ],
              [
                "type",
                "",
                1,
                "p-1",
                "px-3",
                "text-lg",
                "text-white",
                "transition-all",
                "duration-300",
                "bg-gray-800",
                "rounded-sm",
                "outline-none",
                "cursor-pointer",
                "hover:bg-gray-500",
              ],
              [1, "mt-6", "text-lg", "text-gray-900", "w-36", 3, "value"],
            ],
            template: function (n, r) {
              1 & n &&
                (u(0, "div", 0),
                u(1, "p", 1),
                g(2),
                c(),
                c(),
                u(3, "div", 2),
                u(4, "form", 3),
                u(5, "p", 4),
                g(6, "Add TPM Product Link"),
                c(),
                u(7, "div", 5),
                u(8, "p", 6),
                g(9, "Select TPM App"),
                c(),
                u(10, "select", 7),
                D("change", function (s) {
                  return r.TpmLinkInput(s);
                }),
                u(11, "option", 6),
                g(12, "Choose an app"),
                c(),
                oe(13, PF, 2, 2, "option", 8),
                c(),
                c(),
                u(14, "div", 5),
                u(15, "p", 6),
                g(16, "Select Product"),
                c(),
                u(17, "select", 7),
                D("change", function (s) {
                  return r.ProductSelectInput(s);
                }),
                u(18, "option", 6),
                g(19, "Choose a Product"),
                c(),
                oe(20, RF, 2, 2, "option", 8),
                c(),
                c(),
                u(21, "div", 5),
                u(22, "label", 6),
                g(23, "TPM Link"),
                c(),
                u(24, "textarea", 9),
                D("input", function (s) {
                  return r.TPMLink(s);
                }),
                c(),
                c(),
                u(25, "div", 10),
                u(26, "button", 11),
                D("click", function () {
                  return r.sendOnClick();
                }),
                g(27, "Send"),
                c(),
                u(28, "button", 12),
                g(29, "Cancel"),
                c(),
                c(),
                c(),
                c()),
                2 & n &&
                  (vn(
                    "fixed z-40 p-3 ",
                    r.msg_popup_display,
                    " transition-all ease-linear duration-500 ",
                    r.msg_popup_color,
                    " bottom-0 right-64"
                  ),
                  y(2),
                  x(r.msg_popup_msg),
                  y(11),
                  O("ngForOf", r.tpm_details),
                  y(7),
                  O("ngForOf", r.productDetails));
            },
            directives: [je],
            styles: [""],
          })),
          t
        );
      })();
      function AF(t, e) {
        if ((1 & t && (u(0, "option", 31), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.tp_id), y(1), x(n.tp_name);
        }
      }
      function kF(t, e) {
        if ((1 & t && (u(0, "option", 31), g(1), c()), 2 & t)) {
          const n = e.$implicit;
          O("value", n.pid), y(1), x(n.product_name);
        }
      }
      function NF(t, e) {
        if (
          (1 & t &&
            (u(0, "tr", 32),
            u(1, "td", 29),
            g(2),
            c(),
            u(3, "td", 29),
            g(4),
            c(),
            u(5, "td", 29),
            g(6),
            c(),
            u(7, "td", 33),
            u(8, "a", 34),
            g(9),
            c(),
            c(),
            u(10, "td", 29),
            g(11),
            c(),
            u(12, "td", 29),
            g(13),
            c(),
            c()),
          2 & t)
        ) {
          const n = e.$implicit;
          y(2),
            x(n.tp_review_id),
            y(2),
            x(n.third_party_master.tp_name),
            y(2),
            x(n.product_master.product_name),
            y(2),
            B("href", n.tpm_product_url, U),
            y(1),
            x(n.tpm_product_url),
            y(2),
            x(n.created_at),
            y(2),
            x(n.updated_at);
        }
      }
      const OF = [
        { path: "", component: vO, canActivate: [ct] },
        { path: "dashboard", component: qO, canActivate: [ct] },
        { path: "login", component: QO },
        { path: "product-suggestion-master", component: sF, canActivate: [ct] },
        {
          path: "product-suggestion-master/product-reviews",
          component: BO,
          canActivate: [ct],
        },
        {
          path: "product-suggestion-master/product-videos",
          component: oF,
          canActivate: [ct],
        },
        {
          path: "product-suggestion-master/product-suggestion",
          component: fF,
          canActivate: [ct],
        },
        {
          path: "product-suggestion-master/product-review-images",
          component: gF,
          canActivate: [ct],
        },
        { path: "masters", component: iF, canActivate: [ct] },
        { path: "masters/users", component: GO, canActivate: [ct] },
        { path: "masters/products", component: ZO, canActivate: [ct] },
        { path: "masters/products-usp", component: vF, canActivate: [ct] },
        { path: "qr-manager/batch-master", component: uF, canActivate: [ct] },
        { path: "qr-manager/qr-master", component: xF, canActivate: [ct] },
        { path: "third-party/tpm-apps", component: SF, canActivate: [ct] },
        {
          path: "third-party/tpm-product-review-links",
          component: (() => {
            class t {
              constructor(n, r) {
                (this.http = n),
                  (this.router = r),
                  (this._url = Ce_baseURL),
                  (this.more_option_logo =
                    "../../assets/product_review_more.png"),
                  (this.add_TPM_display = "hidden"),
                  (this.cancel_img = "../../assets/cancel.png"),
                  (this.refresh_icon = "../../assets/refresh.png"),
                  (this.total_TPM_Prods = "0"),
                  (this.input_TPM_name = ""),
                  (this.tpm_Prod_Rev_count = 0),
                  (this.req_body = { tpmName: "", pid: "" });
              }
              reloadWithoutRfresh() {
                console.log("Refresh button pressed");
                let n = this.router.url;
                (this.router.routeReuseStrategy.shouldReuseRoute = () => !1),
                  (this.router.onSameUrlNavigation = "reload"),
                  this.router.navigate([n]);
              }
              fetchTPMDetails() {
                return this.http
                  .post(this._url + "getTPMDetails", { limit: 100 })
                  .pipe(
                    P((n) => {
                      const r = JSON.stringify(n);
                      return JSON.parse(r).data;
                    })
                  )
                  .subscribe((n) => {
                    (this.tp_app_list = n.rows),
                      (this.total_TPM_Prods = n.count);
                  });
              }
              fetchTPM_Prod_RevDetails() {
                return this.http
                  .post(this._url + "getTPMReview", { limit: 100 })
                  .pipe(
                    P((n) => {
                      const r = JSON.stringify(n);
                      return JSON.parse(r).data;
                    })
                  )
                  .subscribe((n) => {
                    (this.tpm_Prod_Rev_Data = n.rows),
                      (this.tpm_Prod_Rev_count = n.count);
                  });
              }
              fetchProdDetails() {
                return this.http
                  .post(this._url + "getProductsMaster/all", { limit: 1e4 })
                  .pipe(
                    P((n) => {
                      const r = JSON.stringify(n);
                      return JSON.parse(r).data;
                    })
                  )
                  .subscribe((n) => {
                    this.prod_details = n.rows;
                  });
              }
              fetchTPM_Prod_RevDetails_adv(n) {
                return this.http
                  .post(this._url + "getTPMReview", n)
                  .pipe(
                    P((r) => {
                      const o = JSON.stringify(r);
                      return JSON.parse(o).data;
                    })
                  )
                  .subscribe((r) => {
                    (this.tpm_Prod_Rev_Data = r.rows),
                      (this.total_TPM_Prods = r.count);
                  });
              }
              onChange_Prod_SearchInput(n) {
                (this.req_body.pid = n.target.value),
                  "Choose a Product" === this.req_body.pid &&
                    (this.req_body.pid = ""),
                  console.log(this.req_body);
              }
              onChange_TPMNameInput(n) {
                (this.req_body.tpmName = n.target.value),
                  "Choose a TP App" === this.req_body.tpmName &&
                    (this.req_body.tpmName = ""),
                  console.log(this.req_body);
              }
              onChange_TPM_SearchInput(n) {
                (this.input_TPM_name = n.target.value),
                  (this.req_body.tpmName = this.input_TPM_name),
                  console.log(this.req_body),
                  this.req_body.tpmName
                    ? this.fetchTPM_Prod_RevDetails_adv(this.req_body)
                    : this.fetchTPM_Prod_RevDetails();
              }
              ngOnInit() {
                this.fetchTPM_Prod_RevDetails(),
                  this.fetchTPMDetails(),
                  this.fetchProdDetails();
              }
              onClickDisplay() {
                this.add_TPM_display = "block";
              }
              onClickHide() {
                this.add_TPM_display = "hidden";
              }
            }
            return (
              (t.ɵfac = function (n) {
                return new (n || t)(T(we), T(ce));
              }),
              (t.ɵcmp = ie({
                type: t,
                selectors: [["app-tpm-product-review-links"]],
                decls: 56,
                vars: 10,
                consts: [
                  [1, "flex", "mt-0"],
                  [
                    1,
                    "fixed",
                    "flex-shrink-0",
                    "float-left",
                    "-ml-10",
                    "shadow-lg",
                    "md:ml-0",
                  ],
                  [
                    1,
                    "flex-shrink",
                    "float-left",
                    "w-full",
                    "ml-2",
                    "overflow-hidden",
                    "md:ml-64",
                  ],
                  [1, "w-full", "max-h-full", "min-h-screen", "bg-gray-200"],
                  ["id", "add_TPM_component"],
                  [1, "-ml-64"],
                  [
                    1,
                    "absolute",
                    "top-0",
                    "w-5",
                    "h-5",
                    "m-8",
                    "cursor-pointer",
                    "right-64",
                    3,
                    "src",
                    "click",
                  ],
                  [1, "m-36"],
                  [1, "w-full", "p-1", "py-1", "bg-gray-100", "md:py-4"],
                  [1, "text-lg", "font-semibold", "text-gray-600"],
                  [
                    1,
                    "absolute",
                    "p-1",
                    "px-2",
                    "text-gray-700",
                    "bg-gray-300",
                    "shadow-sm",
                    "top-2.5",
                    "right-5",
                    "flex",
                    "hover:bg-opacity-50",
                    "duration-300",
                    "transition-all",
                    3,
                    "click",
                  ],
                  [1, "w-4", "h-4", "mr-1", "mt-1.5", 3, "src"],
                  [1, "relative", "xl:p-12"],
                  [1, "w-full", "bg-white", "md:rounded-md", "md:p-5"],
                  [
                    1,
                    "relative",
                    "flex",
                    "p-2",
                    "space-x-2",
                    "bg-black",
                    "bg-opacity-75",
                    "md:rounded-t-md",
                  ],
                  [1, "w-12", "h-12", 3, "src"],
                  [
                    1,
                    "mt-2",
                    "text-2xl",
                    "font-extrabold",
                    "text-gray-200",
                    "uppercase",
                  ],
                  [
                    1,
                    "absolute",
                    "flex",
                    "mt-1",
                    "space-x-2",
                    "md:space-x-6",
                    "right-3",
                  ],
                  [
                    1,
                    "p-1",
                    "text-sm",
                    "transition-all",
                    "duration-300",
                    "bg-green-400",
                    "rounded-sm",
                    "hover:bg-green-500",
                    "md:text-md",
                    3,
                    "click",
                  ],
                  [1, "text-base", "font-bold", "md:text-xl"],
                  [
                    1,
                    "hidden",
                    "w-full",
                    "p-3",
                    "space-y-6",
                    "bg-black",
                    "bg-opacity-50",
                    "xl:space-y-0",
                    "xl:space-x-4",
                    "md:block",
                    "xl:flex",
                  ],
                  [1, "flex", "flex-grow", "space-x-3"],
                  [
                    "placeholder",
                    "Search for product",
                    1,
                    "flex-grow",
                    "h-10",
                    "p-1",
                    "text-gray-900",
                    "bg-gray-100",
                    "outline-none",
                    3,
                    "input",
                  ],
                  [
                    1,
                    "hidden",
                    "h-10",
                    "p-1",
                    "text-gray-900",
                    "bg-gray-100",
                    "outline-none",
                    "md:block",
                    "max-w-max",
                    3,
                    "change",
                  ],
                  [3, "value", 4, "ngFor", "ngForOf"],
                  [
                    1,
                    "w-full",
                    "p-1",
                    "my-5",
                    "overflow-auto",
                    "md:p-2",
                    "lg:p-5",
                  ],
                  [1, "text-sm", "italic", "font-semibold", "text-gray-500"],
                  [1, "w-full"],
                  [1, "bg-black", "bg-opacity-75", "text-gray-50"],
                  [
                    1,
                    "p-1",
                    "text-xs",
                    "text-center",
                    "border",
                    "border-t-0",
                    "border-gray-400",
                    "md:text-sm",
                    "md:p-3",
                  ],
                  [
                    "class",
                    "transition-all duration-300 hover:bg-gray-200",
                    4,
                    "ngFor",
                    "ngForOf",
                  ],
                  [3, "value"],
                  [1, "transition-all", "duration-300", "hover:bg-gray-200"],
                  [
                    1,
                    "p-1",
                    "text-xs",
                    "text-center",
                    "text-blue-600",
                    "border",
                    "border-t-0",
                    "border-gray-400",
                    "md:text-sm",
                    "hover:text-blue-400",
                    "md:p-3",
                  ],
                  ["target", "blank", 3, "href"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (u(0, "div", 0),
                    I(1, "app-sidebar", 1),
                    u(2, "div", 2),
                    u(3, "div", 3),
                    u(4, "div", 4),
                    u(5, "div", 5),
                    u(6, "img", 6),
                    D("click", function () {
                      return r.onClickHide();
                    }),
                    c(),
                    u(7, "div", 7),
                    I(8, "app-add-tpm-product-reviewlink"),
                    c(),
                    c(),
                    c(),
                    u(9, "div", 8),
                    u(10, "p", 9),
                    g(11, "Home/ Third Party/ TPM Product Review Links "),
                    c(),
                    u(12, "button", 10),
                    D("click", function () {
                      return r.reloadWithoutRfresh();
                    }),
                    I(13, "img", 11),
                    g(14, " Refresh"),
                    c(),
                    c(),
                    u(15, "div", 12),
                    u(16, "div", 13),
                    u(17, "div", 14),
                    I(18, "img", 15),
                    u(19, "p", 16),
                    g(20, "TPM Product Review Links"),
                    c(),
                    u(21, "div", 17),
                    u(22, "button", 18),
                    D("click", function () {
                      return r.onClickDisplay();
                    }),
                    u(23, "span", 19),
                    g(24, "+"),
                    c(),
                    g(25, " Add TPM Product"),
                    c(),
                    c(),
                    c(),
                    u(26, "div", 20),
                    u(27, "div", 21),
                    u(28, "input", 22),
                    D("input", function (s) {
                      return r.onChange_Prod_SearchInput(s);
                    }),
                    c(),
                    u(29, "select", 23),
                    D("change", function (s) {
                      return r.onChange_TPMNameInput(s);
                    }),
                    u(30, "option"),
                    g(31, "Choose a TP App"),
                    c(),
                    oe(32, AF, 2, 2, "option", 24),
                    c(),
                    u(33, "select", 23),
                    D("change", function (s) {
                      return r.onChange_Prod_SearchInput(s);
                    }),
                    u(34, "option"),
                    g(35, "Choose a Product"),
                    c(),
                    oe(36, kF, 2, 2, "option", 24),
                    c(),
                    c(),
                    c(),
                    u(37, "div", 25),
                    u(38, "p", 26),
                    g(39),
                    c(),
                    u(40, "table", 27),
                    u(41, "thead", 28),
                    u(42, "th", 29),
                    g(43, "TP review Id"),
                    c(),
                    u(44, "th", 29),
                    g(45, "TP App"),
                    c(),
                    u(46, "th", 29),
                    g(47, "Product"),
                    c(),
                    u(48, "th", 29),
                    g(49, "TPM Product Url"),
                    c(),
                    u(50, "th", 29),
                    g(51, "Created_at"),
                    c(),
                    u(52, "th", 29),
                    g(53, "Updated_at"),
                    c(),
                    c(),
                    u(54, "tbody"),
                    oe(55, NF, 14, 7, "tr", 30),
                    c(),
                    c(),
                    c(),
                    c(),
                    c(),
                    c(),
                    c(),
                    c()),
                    2 & n &&
                      (y(4),
                      He(
                        "",
                        r.add_TPM_display,
                        " fixed top-0  z-50 flex items-center justify-center w-full h-screen overflow-hidden backdrop-filter bg-black backdrop-blur-md bg-opacity-90"
                      ),
                      y(2),
                      B("src", r.cancel_img, U),
                      y(7),
                      B("src", r.refresh_icon, U),
                      y(5),
                      B("src", r.more_option_logo, U),
                      y(14),
                      O("ngForOf", r.tp_app_list),
                      y(4),
                      O("ngForOf", r.prod_details),
                      y(3),
                      it(
                        "",
                        r.total_TPM_Prods,
                        " TPM Product Review Links found"
                      ),
                      y(16),
                      O("ngForOf", r.tpm_Prod_Rev_Data));
                },
                directives: [gt, MF, je],
                styles: [""],
              })),
              t
            );
          })(),
          canActivate: [ct],
        },
      ];
      let FF = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = qn({ type: t, bootstrap: [bO] })),
          (t.ɵinj = ln({
            providers: [{ provide: Rr, useClass: j0 }],
            imports: [[S2, NO, uO.forRoot(OF)]],
          })),
          t
        );
      })();
      (function () {
        if (t0)
          throw new Error("Cannot enable prod mode after platform setup.");
        e0 = !1;
      })(),
        T2()
          .bootstrapModule(FF)
          .catch((t) => console.error(t));
    },
  },
  (Ko) => {
    Ko((Ko.s = 10));
  },
]);
